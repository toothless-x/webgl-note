/* eslint-disable no-underscore-dangle */

class Vector4 {
  // 内部元素
  private _elements: Float32Array;

  constructor(src?: Vector4) {
    if (src) {
      this._elements = new Float32Array(src.elements);
    } else {
      this._elements = new Float32Array(4);
    }
  }

  public get elements() {
    return this._elements;
  }

  public static getVector4(
    x: number = 0, y: number = 0, z: number = 0, w: number = 1,
  ): Vector4 {
    const vec4 = new Vector4();
    vec4._elements[0] = x;
    vec4._elements[1] = y;
    vec4._elements[2] = z;
    vec4._elements[3] = w;

    return vec4;
  }
}

export {
  Vector4,
};
