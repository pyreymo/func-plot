import * as THREE from "three";

// 二维绘图，通过三次样条对函数的采样点进行10倍插值
export class Plot {
  constructor(scene, func, xRange = [-1, 1], samples = 100, color = 0x0000ff) {
    this.func = func;
    this.range = xRange;
    this.left = this.range[0];
    this.right = this.range[1];
    this.samples = samples;
    this.scene = scene;

    this.x = [...Array(this.samples).keys()].map(
      (x) => this.left + (x * (this.right - this.left)) / this.samples
    );

    this.y = this.x.map(this.func);
    this.color = color;
    this.plotObj = undefined;

    const points = [];
    for (let i = 0; i < this.samples; i++) {
      const x = this.x[i];
      const y = this.y[i];
      points.push(new THREE.Vector2(x, y));
    }
    this.points = points;
    const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
    const curveMat = new THREE.LineBasicMaterial({ color: this.color });
    this.plotObj = new THREE.Line(curveGeo, curveMat);
    this.scene.add(this.plotObj);
  }
}
