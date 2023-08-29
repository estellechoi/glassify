'use client';

import { useMemo, useRef } from 'react';
import { Canvas, type ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import type { ShaderMaterial, Texture } from 'three';
import type { ShaderMaterialInitialArgs } from '@/components/types';
import usePlaneMeshScale from '@/components/hooks/usePlaneMeshScale';
import useCanvasFadeInClassName from '@/components/hooks/useCanvasFadeInClassName';
import useCanvasPointerCoordinates from '@/components/hooks/useCanvasPointerCoordinates';
import useElementDimension from '@/components/hooks/useElementDimension';
import { PIXELATE_GLSL_MAP } from './glsl';
import { useTexture } from '@react-three/drei';
import StayEffortlessImg from '@/resources/images/tg_stay_effortless.png';
// import StillEarningImg from '@/resources/images/tg_still_achieving.png';
// import DisplacementImg from '@/resources/textures/texture_noise.jpg';
import DisplacementImg from '@/resources/textures/texture_blocks_random.jpg';

export type PixelateShaderUniforms = {
  u_disp: { type?: string; value: Texture };
  u_texture: { type?: string; value: Texture };
  t: { type?: string; value: number };
  h: { type?: string; value: number };
  s: { type?: string; value: [number, number] };
  r: { type?: string; value: number };
  u_resolution: { type?: string; value: [number, number] };
  m: { type?: string; value: [number, number, number, number] };
  q: { type?: string; value: [number, number] };
  j: { type?: string; value: number };
  g: { type?: string; value: number };
  y: { type?: string; value: number };
};

export const PIXELATE_SHADER_UNIFORMS: Omit<PixelateShaderUniforms, 'u_disp' | 'u_texture'> = {
  // u_disp: {
  //   type: '1i',
  //   value: 0,
  // },
  // u_texture: {
  //   type: '1i',
  //   value: 1,
  // },
  t: {
    type: '1i',
    value: 0,
  },
  h: {
    type: '1i',
    value: 0,
  },
  s: {
    type: '2fv',
    value: [1, 1],
  },
  r: {
    type: '1f',
    value: 0,
  },
  u_resolution: {
    type: '2fv',
    value: [0, 0],
  },
  m: {
    type: '4fv',
    value: [0, 0, 0, 0],
  },
  q: {
    type: '2fv',
    value: [0, 0],
  },
  j: {
    type: '1f',
    value: 0,
  },
  g: {
    type: '1f',
    value: 0,
  },
  y: {
    type: '1f',
    value: 0,
  },
};

const PixelateMesh = () => {
  const ref = useRef<ShaderMaterial>(null);

  const { coordinates, updateCoordinates } = useCanvasPointerCoordinates();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.uniforms.m.value = [coordinates?.x ?? 0, coordinates?.y ?? 0];
  });

  const [texture, dispTexture] = useTexture([StayEffortlessImg.src, DisplacementImg.src]);

  const args = useMemo<ShaderMaterialInitialArgs<PixelateShaderUniforms>>(
    () => ({
      uniforms: { ...PIXELATE_SHADER_UNIFORMS, u_disp: { value: dispTexture }, u_texture: { value: texture } },
      ...PIXELATE_GLSL_MAP,
      // pts = {
      //   h: 2,
      //   v: 2,
      // },
    }),
    [texture, dispTexture]
  );

  const { size, viewport } = useThree();
  const meshDimension = usePlaneMeshScale(size, viewport);

  return (
    <mesh
      scale={meshDimension}
      onPointerOver={updateCoordinates}
      onPointerMove={updateCoordinates}
      onPointerOut={updateCoordinates}
    >
      <planeGeometry attach="geometry" args={[1, 1]} />
      <shaderMaterial ref={ref} attach="material" args={[args]} />
    </mesh>
  );
};

const PixelateCanvas = ({ className = '' }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const dimension = useElementDimension(ref.current);

  const { onCreated, className: visibilityClassName } = useCanvasFadeInClassName();

  return (
    <div ref={ref} className={`Component ${className} ${visibilityClassName}`}>
      <Canvas camera={{ position: [0, 0, 2], fov: 47 }} onCreated={onCreated}>
        <PixelateMesh />
      </Canvas>
    </div>
  );
};

export default PixelateCanvas;
