'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, type MeshProps } from '@react-three/fiber';
import { AsciiRenderer } from '@react-three/drei';
import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';

extend({ Mesh, BoxGeometry, MeshStandardMaterial });

const SphereMesh = (props: MeshProps) => {
  const meshRef = useRef<Mesh>(null);
  // const viewport = useThree((state) => state.viewport);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta / 2;
      meshRef.current.rotation.y += delta / 2;
    }
  });

  return (
    <mesh ref={meshRef} {...props}>
      <sphereGeometry args={[2.4, 20, 20, 32]} />

      {/** @see https://threejs.org/docs/#api/en/materials/MeshPhongMaterial performance */}
      <meshPhongMaterial flatShading={true} />
    </mesh>
  );
};

const AsciiGlobe = () => {
  const [canvasProps, setCanvasProps] = useState<{ camera: THREE.PerspectiveCamera; scene: THREE.Scene }>();

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    const scene = new THREE.Scene();
    setCanvasProps({ camera, scene });
  }, []);

  if (!canvasProps) return null;

  /** @warning @react-three/fiber Canvas fill parent's size, which must be in inline styles */
  return (
    <div
      className="fixed inset-0"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Canvas>
        <color attach="background" args={[0, 0, 0]} />

        <pointLight color={new THREE.Color(0xffffff)} intensity={3} distance={0} decay={0} position={[500, 500, 500]} />
        <pointLight color={new THREE.Color(0xffffff)} intensity={3} distance={0} decay={0} position={[-500, -500, -500]} />

        <SphereMesh />

        {/**
         *
         * @see https://github.com/pmndrs/drei#asciirenderer
         * @see https://codesandbox.io/s/vq9wsl?file=/src/Canvas.js example
         */}
        <AsciiRenderer fgColor="#000" bgColor="transparent" characters=" .:-+*=%@#" invert={true} />
      </Canvas>
    </div>
  );
};

export default AsciiGlobe;
