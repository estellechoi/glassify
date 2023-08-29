'use client';

import { CSSProperties, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import useCanvasFadeInClassName from '@/components/hooks/useCanvasFadeInClassName';
import DisplacementMesh, { type DisplacementMeshProps } from './DisplacementMesh';
import useElementDimension from '../hooks/useElementDimension';

type DisplacementCanvasProps = DisplacementMeshProps & { className?: string; style?: CSSProperties };

const DisplacementCanvas = ({ className = '', style, ...meshProps }: DisplacementCanvasProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const dimension = useElementDimension(ref.current, meshProps.textureImage1);

  const { onCreated, className: visibilityClassName } = useCanvasFadeInClassName();

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
        <Canvas camera={{ position: [0, 0, 2], fov: 47, aspect: dimension.aspect }} onCreated={onCreated}>
          <DisplacementMesh {...meshProps} />
        </Canvas>
      )}
    </div>
  );
};

export default DisplacementCanvas;
