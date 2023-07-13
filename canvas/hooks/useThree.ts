import { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';
//@ts-ignore
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
//@ts-ignore
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const useThree = ({
  mesh,
  width: injectedWidth,
  height: injectedHeight,
}: {
  mesh: THREE.Mesh;
  width?: number;
  height?: number;
}) => {
  const [size, setSize] = useState<{ width: number; height: number }>();

  const [toolbox, setToolbox] = useState<{
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    mesh: THREE.Mesh;
    effect: AsciiEffect;
  }>();

  const [controls, setControls] = useState<TrackballControls>();
  const [startTime, setStartTime] = useState<number>(Date.now());

  /**
   *
   * @description initialize the renderer, camera, scene, effect, and controls
   */
  const initialize = useCallback(() => {
    // size
    const width = injectedWidth ?? window.innerWidth;
    const height = injectedHeight ?? window.innerHeight;
    setSize({ width, height });

    // renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.useLegacyLights = false;

    // camera
    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 500;

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
    pointLight1.position.set(500, 500, 500);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
    pointLight2.position.set(-500, -500, -500);
    scene.add(pointLight2);

    // mesh
    scene.add(mesh);

    // effect
    const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
    effect.setSize(width, height);
    effect.domElement.style.color = '#000';
    effect.domElement.style.backgroundColor = 'transparent';
    // Special case: append effect.domElement, instead of renderer.domElement.
    // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
    document.body.appendChild(effect.domElement);

    setToolbox({ renderer, camera, scene, mesh, effect });

    // controls
    const controls = new TrackballControls(camera, effect.domElement);
    setControls(controls);
  }, []);

  const render = useCallback(() => {
    if (!toolbox) return;

    const timer = Date.now() - startTime;

    toolbox.mesh.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
    toolbox.mesh.rotation.x = timer * 0.0003;
    toolbox.mesh.rotation.z = timer * 0.0002;

    controls.update();

    toolbox.effect.render(toolbox.scene, toolbox.camera);
  }, [toolbox, startTime, controls]);

  const animate = useCallback(() => {
    requestAnimationFrame(animate);
    render();
  }, [render]);

  const startAnimation = useCallback(() => {
    setStartTime(Date.now());
    animate();
  }, [animate]);

  /**
   *
   * @description resize the renderer and camera
   */
  const onWindowResize = useCallback(() => {
    if (!size) return;
    if (!toolbox) return;

    const { width, height } = size;

    toolbox.camera.aspect = width / height;
    toolbox.camera.updateProjectionMatrix();
    toolbox.renderer.setSize(width, height);
    toolbox.effect.setSize(width, height);
  }, [toolbox, size]);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  return { size, toolbox, controls, initialize, startAnimation };
};

export default useThree;
