'use client';

import * as THREE from 'three';
import { useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AsciiRenderer } from '@react-three/drei';
import SphereMesh from './SphereMesh';

type AsciiGlobeProps = {
  onRender?: () => void;
};

const AsciiGlobe = ({ onRender }: AsciiGlobeProps) => {
  const [isRendered, setIsRendered] = useState<boolean>(false);

  const onCreated = useCallback(() => {
    setIsRendered(true);
    onRender?.();
  }, [onRender]);

  const visibilityClassName = isRendered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2';
  /**
   *
   * @warning @react-three/fiber Canvas fill parent's size, which must be in inline styles
   */
  const sizeStyle = { width: '100vw', height: window.innerWidth / window.innerHeight >= 1 ? '100vh' : '80vh' };

  return (
    <div className={`fixed inset-0 -z-1 transition-all duration-1000 ${visibilityClassName}`} style={sizeStyle}>
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
