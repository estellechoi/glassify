import useThree from 'canvas/hooks/useThree';
import * as THREE from 'three';
import { useEffect } from 'react';

const Globe = () => {
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(200, 20, 10), new THREE.MeshPhongMaterial({ flatShading: true }));
  const { initialize, startAnimation } = useThree({ mesh: sphere });

  useEffect(() => {
    initialize();
    startAnimation();
  }, []);

  return <canvas id="globe"></canvas>;
};

export default Globe;
