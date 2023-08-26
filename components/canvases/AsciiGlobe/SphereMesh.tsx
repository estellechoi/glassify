import { type MeshProps, useFrame, useThree, extend } from '@react-three/fiber';
import { Ref, forwardRef, useRef } from 'react';
import { Mesh } from 'three';
import TestShader, { ShaderEvents } from '../../TestShader';

extend({ Mesh });

const SphereMeshForwarder = (props: MeshProps, shaderRef?: Ref<ShaderEvents>) => {
  const meshRef = useRef<Mesh>(null);
  const viewport = useThree((state) => state.viewport);
  //   const meshScale = new THREE.Vector3(1, 1, 1)
  const sphereGeometryRadius = 2.4 / (viewport.aspect >= 1 ? 1 : 1.1);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta / 4;
      meshRef.current.rotation.y += delta / 4;
    }
  });

  return (
    <mesh ref={meshRef} {...props}>
      <sphereGeometry args={[sphereGeometryRadius, 20, 20, 32]} />

      {/** @see https://threejs.org/docs/#api/en/materials/MeshPhongMaterial performance */}
      <meshPhongMaterial flatShading={true} />
    </mesh>
  );
};

const SphereMesh = forwardRef(SphereMeshForwarder);

export default SphereMesh;
