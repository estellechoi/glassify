'use client';

import type { StaticImageData } from 'next/image';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { useTexture } from '@react-three/drei';
import { Canvas, useFrame, MeshProps, useThree } from '@react-three/fiber';
import { type ShaderMaterial } from 'three';
import { MathUtils } from 'three/src/math/MathUtils';

export type CustomGLSLProps = {
  vertexShader?: string;
  fragmentShader?: string;
};

export const WAIVY_CUSTOM_GLSL_MAP: CustomGLSLProps = {
  vertexShader: `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    #ifdef GL_ES
    precision highp float;
    #endif
    // precision highp float;

    varying vec2 vUv;

    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;

    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;

    void main() {
        vec2 uv = vUv;
        vec4 disp = texture2D(disp, uv);
        vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
        vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
        vec4 _texture = texture2D(tex, distortedPosition);
        vec4 _texture2 = texture2D(tex2, distortedPosition2);
        vec4 finalTexture = mix(_texture, _texture2, dispFactor);

        gl_FragColor = finalTexture;

        #include <tonemapping_fragment>
        #include <encodings_fragment>
    }
  `,
};

export type CanvasDimension = {
  width: number;
  height: number;
  aspect: number;
};

export type DisplacementMeshProps = {
  textureImage1: StaticImageData;
  textureImage2: StaticImageData;
  displacementImage: StaticImageData;
};

const DisplacementMesh = ({ textureImage1, textureImage2, displacementImage }: DisplacementMeshProps) => {
  const ref = useRef<ShaderMaterial>(null);

  useFrame(() => {
    if (ref.current)
      ref.current.uniforms.dispFactor.value = MathUtils.lerp(ref.current.uniforms.dispFactor.value, isHovered ? 1 : 0, 0.075);
  });

  const [isHovered, setIsHovered] = useState(false);

  const [texture1, texture2, dispTexture] = useTexture([textureImage1.src, textureImage2.src, displacementImage.src]);

  const args = useMemo(
    () => ({
      uniforms: {
        effectFactor: { value: 1.2 },
        dispFactor: { value: 0 },
        tex: { value: texture1 },
        tex2: { value: texture2 },
        disp: { value: dispTexture },
      },
      ...WAIVY_CUSTOM_GLSL_MAP,
      toneMapped: false,
    }),
    [texture1, texture2, dispTexture]
  );

  const { size, viewport } = useThree();

  const meshDimension = useMemo<MeshProps['scale']>(() => {
    const width = size.width / viewport.factor;
    const height = size.height / viewport.factor;
    return [width, height, 1];
  }, [size.width, size.height, viewport.factor, viewport.aspect]);

  return (
    <mesh scale={meshDimension} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <shaderMaterial ref={ref} attach="material" args={[args]} />
    </mesh>
  );
};

const DisplacementCanvas = ({
  className = '',
  style,
  ...meshProps
}: DisplacementMeshProps & { className?: string; style?: CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [dimension, setDimension] = useState<CanvasDimension>();

  useEffect(() => {
    if (!ref.current) return;

    const aspect = meshProps.textureImage1.width / meshProps.textureImage1.height;
    const width = ref.current.clientWidth;
    const height = width / aspect;
    setDimension({ width, height, aspect });
  }, [meshProps.textureImage1]);

  const visibilityClassName = !!dimension ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2';

  console.log('dimension', dimension);

  return (
    <div
      ref={ref}
      className={`Component transition-all duration-1000 ${visibilityClassName} ${className}`}
      style={{
        height: `${dimension?.height}px`,
        ...style,
      }}
    >
      {dimension && (
        <Canvas camera={{ position: [0, 0, 2], fov: 47, aspect: dimension.aspect }} className="animate-fade_in">
          <DisplacementMesh {...meshProps} />
        </Canvas>
      )}
    </div>
  );
};

export default DisplacementCanvas;
