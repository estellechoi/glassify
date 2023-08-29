'use client';

import * as THREE from 'three';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AsciiRenderer } from '@react-three/drei';
import SphereMesh from './SphereMesh';
import useCanvasFadeInClassName from '@/components/hooks/useCanvasFadeInClassName';
import useCanvasPointerCoordinates from '@/components/hooks/useCanvasPointerCoordinates';

type AsciiGlobeProps = {
  onRender?: () => void;
  className?: string;
};

const AsciiGlobe = ({ onRender, className = '' }: AsciiGlobeProps) => {
  const { isCreated, onCreated, className: visibilityClassName } = useCanvasFadeInClassName();

  useEffect(() => {
    if (isCreated) onRender?.();
  }, [isCreated]);

  /**
   *
   * @warning @react-three/fiber Canvas fill parent's size, which must be in inline styles
   */
  const sizeStyle = { width: '100vw', height: window.innerWidth / window.innerHeight >= 1 ? '100vh' : '80vh' };

  const { isObejctInteractedEver, persistInteractedObject, moveObjectToCanvasPointer } = useCanvasPointerCoordinates();

  return (
    <div
      className={`Component w-screen h-screen transition-all duration-1000 ${visibilityClassName} ${className}`}
      style={sizeStyle}
    >
      <Canvas onCreated={onCreated} onPointerMove={moveObjectToCanvasPointer}>
        <color attach="background" args={[0, 0, 0]} />

        <pointLight position={[10, 10, 10]} />
        <pointLight color={new THREE.Color(0xffffff)} intensity={3} distance={0} decay={0} position={[-500, -500, -500]} />

        <SphereMesh onPointerEnter={isObejctInteractedEver ? undefined : persistInteractedObject} />

        {/**
         *
         * @see https://github.com/pmndrs/drei#asciirenderer
         * @see https://codesandbox.io/s/vq9wsl?file=/src/Canvas.js example
         */}
        <AsciiRenderer
          fgColor="#000"
          bgColor="transparent"
          characters=" .:-+*=%@#"
          // invert={true}
        />
      </Canvas>
    </div>
  );
};

export default AsciiGlobe;
