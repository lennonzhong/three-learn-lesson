import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import basicVetex from "./asset/glsl/basic/vetex.glsl";
import basicFragment from "./asset/glsl/basic/fragment.glsl";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
scene.add(camera);
camera.lookAt(0, 0, 0);
camera.position.set(0, 0, 20);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

// 内容区
let planeGeometry = new THREE.PlaneGeometry(10, 10, 64, 64);
let material = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  vertexShader: basicVetex,
  fragmentShader: basicFragment,
});

let plane = new THREE.Mesh(planeGeometry, material);
scene.add(plane);

// 坐标轴辅助线
const axisHelper = new THREE.AxesHelper(500);
scene.add(axisHelper);

let controls = new OrbitControls(camera, renderer.domElement);
// 设置阻尼系数
controls.enableDamping = true;
// 禁止放大缩小
controls.enableZoom = false;
function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
