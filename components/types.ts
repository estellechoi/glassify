import type { IUniform, ShaderMaterialParameters } from 'three';

// overlay
export type OverlayProps = Readonly<{
  id?: string;
  ariaLabel: string;
  isOpen: boolean;
  onClose: () => void;
}>;

// three
export type CustomGLSLProps = Readonly<{
  vertexShader?: string;
  fragmentShader?: string;
}>;

export type ShaderMaterialInitialArgs<T extends { [uniform: string]: IUniform }> = Readonly<
  Omit<ShaderMaterialParameters, 'uniforms'> & {
    uniforms: T;
  }
>;
