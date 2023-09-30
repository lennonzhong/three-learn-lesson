import * as THREE from "three"
import { Mesh, MeshBasicMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);
camera.lookAt(0, 0, 0);
camera.position.set(0, 0, 50);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

let textureLoader = new THREE.TextureLoader();
let starTexture = textureLoader.load("./assets/star.png");

let circle = new THREE.SphereGeometry(5, 32, 32);
let material = new THREE.PointsMaterial({
    map: starTexture
});
material.alphaMap = starTexture;
material.transparent = true;

material.depthWrite = false;
material.blending = THREE.AdditiveBlending;

material.size = 0.1;
let points = new THREE.Points(circle, material);
scene.add(points);

// 坐标轴辅助线
const axisHelper = new THREE.AxesHelper(500);
scene.add(axisHelper);

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();