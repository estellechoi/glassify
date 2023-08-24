export type CustomShaderDict = { vertex: string; fragment: string; uniforms?: { [key: string]: { type: string; value: any } } };

export const TEST_CUSTOM_GLSL: CustomShaderDict = {
  vertex: `
    attribute vec2 a_position;

    void main() {
        gl_Position = vec4(a_position, 0, 1);
    }
  `,
  fragment: `
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
`,
};

export const MOSAIQ_CUSTOM_GLSL: CustomShaderDict = {
  vertex: `
    precision highp float;
    
    attribute vec2 p;
    attribute vec2 u;
    
    uniform mat4 e;
    uniform mat4 f;
    uniform vec2 s;
    uniform vec2 w;
    uniform float r;
    
    varying vec2 b;
    varying vec2 c;
    
    void main() {
        vec4 a=f*vec4(p.x,p.y,0.,1);
        gl_Position=e*a;
        b=(u-.5)/s+.5;
        b.y+=r;
        c=(a.xy/w)+.5;
    }`,
  fragment: `
    #extension GL_OES_standard_derivatives: enable
    
    precision highp float;

    uniform sampler2D d;
    uniform sampler2D i;
    
    varying vec2 b;
    varying vec2 c;
    
    uniform int t;
    uniform int h;
    uniform vec4 m;
    uniform vec2 q;
    uniform float j;
    uniform float g;
    uniform float y;
    
    vec3 s(vec3 t) {
        return vec3((t.r+t.g+t.b)/3.);
    }
    
    void main() {
        vec3 f;
        float l=1.;
        vec3 w=vec3(.10196);
        
        if (t==2) {
            vec2 v=b;
            v.x-=q.x*.3;
            v.x+=q.y*.3;
            vec2 n=c;
            n.y=1.-n.y;
            vec3 o=texture2D(i,n).rgb;
            f=texture2D(d,v-.02*o.rg*y).rgb;
            float e=max(min(f.r,f.g),min(max(f.r,f.g),f.b))-.5;
            float k=fwidth(e);
            l=smoothstep(-k,k,e);
            l*=step(j,1.-b.y);
            f=w;
        } else if (t==1) {
            vec2 v=b;
            v.x-=q.x*.3;
            v.x+=q.y*.3;
            vec2 n=c;
            n.y=1.-n.y;
            vec3 o=texture2D(i,n).rgb;
            vec2 aa=o.rg*y;
            f=texture2D(d,v-.02*aa).rgb;
            f=vec3(texture2D(d,v-.023*aa).r,f.g,texture2D(d,v-.017*aa).b);
            f=mix(f,s(f),g);
            l=step(q.x,b.x)*step(q.y,1.-b.x);
        } else {
            f=w;
        }
        
        float r=step(m.x,c.x)*step(m.y,1.-c.x);
        float p=step(m.w,c.y)*step(m.z,1.-c.y);
        float n=h==1?2.-(r+p):r*p;
        gl_FragColor=vec4(f,n*l);
    }`,
  uniforms: {
    d: {
      type: '1i',
      value: 0,
    },
    i: {
      type: '1i',
      value: 1,
    },
    t: {
      type: '1i',
      value: 0,
    },
    h: {
      type: '1i',
      value: 0,
    },
    s: {
      type: '2fv',
      value: [1, 1],
    },
    r: {
      type: '1f',
      value: 0,
    },
    w: {
      type: '2fv',
      value: [0, 0],
    },
    m: {
      type: '4fv',
      value: [0, 0, 0, 0],
    },
    q: {
      type: '2fv',
      value: [0, 0],
    },
    j: {
      type: '1f',
      value: 0,
    },
    g: {
      type: '1f',
      value: 0,
    },
    y: {
      type: '1f',
      value: 0,
    },
  },
};
