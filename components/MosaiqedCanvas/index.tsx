import { useRef, useState } from 'react';
import { useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { ShaderMaterial } from 'three';
import { MOSAIQ_CUSTOM_GLSL } from '../TestShader/customGLSLs';

const MosaiqedMesh = () => {
  const ref = useRef<ShaderMaterial>(null);

  const [hovered, setHover] = useState(false);

  return (
    <mesh onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
      <planeGeometry />
      <shaderMaterial
        ref={ref}
        vertexShader={MOSAIQ_CUSTOM_GLSL.vertex}
        fragmentShader={MOSAIQ_CUSTOM_GLSL.fragment}
        uniforms={MOSAIQ_CUSTOM_GLSL.uniforms}
        // pts={
        //     h: 2,
        //     v: 2
        // },
      />
    </mesh>
  );
};

const MosaiqedCanvas = ({ className = '' }: { className?: string }) => {
  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 50 }} className={`Component w-screen h-screen ${className}`}>
      <MosaiqedMesh />
    </Canvas>
  );
};

export default MosaiqedCanvas;
