import type { ShaderMaterialProps } from '@react-three/fiber';
import {
  type ForwardRefRenderFunction,
  type HTMLProps,
  type MouseEventHandler,
  type Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Mesh, ShaderMaterial, Vector2 } from 'three';
import { TEST_CUSTOM_GLSL } from './customGLSLs';

export const INITIAL_UNIFORMS: ShaderMaterialProps['uniforms'] = {
  u_time: { value: 1.0 },
  u_resolution: { value: new Vector2() },
  u_mouse: { value: new Vector2() },
};

export const VERTEX_SHADER = `
    attribute vec2 a_position;

    void main() {
        gl_Position = vec4(a_position, 0, 1);
    }
`;

export const FRAGMENT_SHADER = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    float lessCoord = min( u_resolution.x, u_resolution.y );
    vec2 resRatio = u_resolution / vec2( lessCoord );

    void main() {
        vec2 grad = abs( ( gl_FragCoord.xy  - u_mouse ) / u_resolution * resRatio );

        float screenX = gl_FragCoord.x / u_resolution.x;
        gl_FragColor = vec4( grad.x, grad.y, screenX, 1.0 );
    }
`;

export type ShaderEvents = Pick<HTMLProps<HTMLElement>, 'onMouseMove'>;

const TestShaderForwarder: ForwardRefRenderFunction<ShaderEvents, {}> = ({}, ref: Ref<ShaderEvents>) => {
  const shaderMaterialRef = useRef<ShaderMaterial | null>(null);
  //   const uniforms = useRef<ShaderMaterialProps['uniforms']>(INITIAL_UNIFORMS);
  const [uniforms, setUniforms] = useState<ShaderMaterialProps['uniforms']>(INITIAL_UNIFORMS);

  const onMouseMove: MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      console.log('onMouseMove', uniforms);
      const uMouse = new Vector2(event.pageX, event.pageY);

      setUniforms((prev) => ({ ...prev, u_mouse: { value: uMouse } }));
    },
    [uniforms]
  );

  useImperativeHandle(
    ref,
    () => {
      return { onMouseMove };
    },
    [onMouseMove]
  );

  return (
    <shaderMaterial
      attach="material"
      ref={shaderMaterialRef}
      vertexShader={TEST_CUSTOM_GLSL.vertex}
      fragmentShader={TEST_CUSTOM_GLSL.fragment}
      uniforms={uniforms}
    />
  );
};

const TestShader = forwardRef<ShaderEvents>(TestShaderForwarder);

export default TestShader;
