import * as THREE from "three";
import * as Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Plot } from "../modules/Plot";

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true, //反走样
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

//=======================================================
new Plot(scene, (x) => Math.tan(x), [-5, 5], 1000);
new Plot(scene, (x) => Math.sin(x), [-5, 5], undefined, 0x66ccff);
new Plot(scene, (x) => Math.cos(x), [-5, 5], undefined, 0x22ff44);
//=======================================================

new OrbitControls(camera, renderer.domElement);

const animate = function () {
  requestAnimationFrame(animate);
  stats.begin();
  renderer.render(scene, camera);
  stats.end();
};

animate();
