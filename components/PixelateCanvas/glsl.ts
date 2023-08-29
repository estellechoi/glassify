import type { CustomGLSLProps } from '@/components/types';

export const PIXELATE_GLSL_MAP: CustomGLSLProps = {
  vertexShader: `
      precision highp float;
      
      attribute vec2 a_mouse;
      
    //   uniform mat4 e;
      uniform mat4 f;
      uniform vec2 s;
      uniform vec2 u_resolution;
      uniform float r;
      
      varying vec2 startCoord;
      varying vec2 endCoord;
      
      void main() {
          vec4 position = f * vec4(position.x, position.y, 0.0, 1.0);
          gl_Position = projectionMatrix * modelViewMatrix * position;

          // translates normalized texture coordinates into the range of normalized coordinates of target
          startCoord = (a_mouse - 0.5) / s + 0.5;
          startCoord.y += r;
          endCoord = (position.xy / u_resolution) + 0.5;
      }`,
  /**
   *
   * @description fwidth is supported by OES_standard_derivatives
   * @see https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
   */
  fragmentShader: `
      #extension GL_OES_standard_derivatives: enable
      
      precision highp float;
  
      varying vec2 startCoord;
      varying vec2 endCoord;

      uniform sampler2D u_disp;
      uniform sampler2D u_texture;

      uniform int t;
      uniform int h;
      uniform vec4 m;
      uniform vec2 q;
      uniform float j;
      uniform float g;
      uniform float y;
      
      vec3 darken(vec3 color) {
          return vec3((color.r + color.g + color.b) / 3.);
      }
      
      void main() {
          vec3 finalTexture;
          float l = 1.;
          vec3 w = vec3(.10196);
          
          if (t == 2) {
              vec2 vStartCoord = startCoord;
              vStartCoord.x -= q.x * 0.3;
              vStartCoord.x += q.y * 0.3;

              vec2 vEndCoord = endCoord;
              vEndCoord.y = 1.0 - vEndCoord.y;

              vec3 pixelatedColor = texture2D(u_texture, vEndCoord).rgb;
              finalTexture = texture2D(u_disp, vStartCoord - 0.02 * pixelatedColor.rg * y).rgb;
              
              float finalColor = max(min(finalTexture.r, finalTexture.g), min(max(finalTexture.r, finalTexture.g), finalTexture.b)) - 0.5;
              float k = fwidth(finalColor);
              l = smoothstep(-k, k, finalColor);
              l *= step(j, 1.0 - startCoord.y);
              
              finalTexture = w;
          } else if (t == 1) {
              vec2 vStartCoord = startCoord;
              vStartCoord.x -= q.x * 0.3;
              vStartCoord.x += q.y * 0.3;

              vec2 vEndCoord = endCoord;
              vEndCoord.y = 1.0 - vEndCoord.y;

              vec3 pixelatedColor = texture2D(u_texture, vEndCoord).rgb;
              vec2 aa = pixelatedColor.rg * y;
              
              finalTexture = texture2D(u_disp, vStartCoord - 0.02 * aa).rgb;
              finalTexture = vec3(texture2D(finalTexture, vStartCoord - 0.023 * aa).r, finalTexture.g, texture2D(finalTexture, vStartCoord - 0.017 * aa).b);
              finalTexture = mix(finalTexture, darken(finalTexture), g);

              l = step(q.x, startCoord.x) * step(q.y, 1.0 - startCoord.x);
          } else {
            finalTexture = w;
          }
          
          float r = step(m.x, endCoord.x) * step(m.y, 1.0 - endCoord.x);
          float p = step(m.w, endCoord.y) * step(m.z, 1.0 - endCoord.y);
          float n = h == 1 ? 2.0 - (r + p) : r * p;
          float alpha = n * l;

          gl_FragColor = vec4(finalTexture, alpha);
      }`,
};
