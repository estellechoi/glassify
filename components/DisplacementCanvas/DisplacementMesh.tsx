import type { StaticImageData } from 'next/image';
import { useMemo, useRef, useState } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from 'three/src/math/MathUtils';
import type { Texture, ShaderMaterial } from 'three';
import usePlaneMeshScale from '@/components/hooks/usePlaneMeshScale';
import type { ShaderMaterialInitialArgs } from '@/components/types';
import { DISPLACEMENT_GLSL_MAP } from './glsl';

type DisplacementShaderUniforms = {
  tex: { value: Texture };
  tex2: { value: Texture };
  disp: { value: Texture };
  _rot?: { value: number };
  dispFactor: { value: number };
  effectFactor: { value: number };
};

export type DisplacementMeshProps = {
  textureImage1: StaticImageData;
  textureImage2: StaticImageData;
  displacementImage: StaticImageData;
};

const DisplacementMesh = ({ textureImage1, textureImage2, displacementImage }: DisplacementMeshProps) => {
  const ref = useRef<ShaderMaterial>(null);

  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (ref.current)
      ref.current.uniforms.dispFactor.value = MathUtils.lerp(ref.current.uniforms.dispFactor.value, isHovered ? 1 : 0, 0.075);
  });

  const [texture1, texture2, dispTexture] = useTexture([textureImage1.src, textureImage2.src, displacementImage.src]);

  const args = useMemo<ShaderMaterialInitialArgs<DisplacementShaderUniforms>>(
    () => ({
      uniforms: {
        effectFactor: { value: 1.2 },
        dispFactor: { value: 0 },
        tex: { value: texture1 },
        tex2: { value: texture2 },
        disp: { value: dispTexture },
      },
      toneMapped: false,
      ...DISPLACEMENT_GLSL_MAP,
    }),
    [texture1, texture2, dispTexture]
  );

  const { size, viewport } = useThree();
  const meshDimension = usePlaneMeshScale(size, viewport);

  return (
    <mesh scale={meshDimension} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <shaderMaterial ref={ref} attach="material" args={[args]} />
    </mesh>
  );
};

export default DisplacementMesh;
