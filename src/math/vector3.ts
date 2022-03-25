/* eslint-disable no-underscore-dangle */

class Vector3 {
  // 内部元素
  private _elements: Float32Array;

  constructor(src?: Vector3) {
    if (src) {
      this._elements = new Float32Array(src.elements);
    } else {
      this._elements = new Float32Array(3);
    }
  }

  public get elements() {
    return this._elements;
  }

  /**
  * Normalize.
  * @return this
  */
  public normalize() {
    const ele = this.elements;
    const [v0 = 0, v1 = 0, v2 = 0] = ele;
    const g = Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);

    if (g === 0) {
      this._elements = new Float32Array([0, 0, 0]);
      return this;
    }

    if (g === 1) {
      return this;
    }

    const gp = 1 / g;
    ele[0] = v0 * gp;
    ele[1] = v1 * gp;
    ele[2] = v2 * gp;

    return this;
  }
}

export {
  Vector3,
};
