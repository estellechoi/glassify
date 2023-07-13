'use client';

import * as THREE from 'three';
import { useCallback, useRef, useState } from 'react';
import { Canvas, extend, useFrame, type MeshProps } from '@react-three/fiber';
import { AsciiRenderer } from '@react-three/drei';
import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';

extend({ Mesh, BoxGeometry, MeshStandardMaterial });

const SphereMesh = (props: MeshProps) => {
  const meshRef = useRef<Mesh>(null);
  // const viewport = useThree((state) => state.viewport);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta / 4;
      meshRef.current.rotation.y += delta / 4;
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

type AsciiGlobeProps = {
  onRender?: () => void;
};

const AsciiGlobe = ({ onRender }: AsciiGlobeProps) => {
  const [isRendered, setIsRendered] = useState<boolean>(false);

  const onCreated = useCallback(() => {
    setIsRendered(true);
    onRender?.();
  }, [onRender]);

  const renderClassName = isRendered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2';

  /**
   *
   * @warning @react-three/fiber Canvas fill parent's size, which must be in inline styles
   */
  return (
    <div
      className={`fixed inset-0 -z-1 transition-all duration-1000 ${renderClassName}`}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Canvas onCreated={onCreated}>
        <color attach="background" args={[0, 0, 0]} />

        <pointLight position={[10, 10, 10]} />
        {/* <pointLight color={new THREE.Color(0xffffff)} intensity={3} distance={0} decay={0} position={[500, 500, 500]} /> */}
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
