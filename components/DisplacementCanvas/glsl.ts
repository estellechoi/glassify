import type { CustomGLSLProps } from '@/components/types';

export const DISPLACEMENT_GLSL_MAP: CustomGLSLProps = {
  vertexShader: `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    #ifdef GL_ES
    precision highp float;
    #endif
    // precision highp float;

    varying vec2 vUv;

    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;

    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;

    void main() {
        vec2 uv = vUv;
        vec4 disp = texture2D(disp, uv);
        vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
        vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
        vec4 _texture = texture2D(tex, distortedPosition);
        vec4 _texture2 = texture2D(tex2, distortedPosition2);
        vec4 finalTexture = mix(_texture, _texture2, dispFactor);

        gl_FragColor = finalTexture;

        #include <tonemapping_fragment>
        #include <encodings_fragment>
    }
  `,
};
