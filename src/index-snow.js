import * as THREE from "three"
import { Mesh, MeshBasicMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 25);
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


function createPoints(name, size) {
    let starTexture = textureLoader.load(`./assets/${name}.png`);
    const BufferGeometry = new THREE.BufferGeometry();
    const count = 50000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    let index = 0;
    for (let i = 0; i < count * 3; i++) {
        if (index === 0) {
            positions[i] = (Math.random() - 0.5) * 100;
        } else {
            positions[i] = Math.random() * 100 + 50;
        }
        if (index === 2) {
            index = 0;
        }
        colors[i] = 0xffffff;
    }

    BufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    BufferGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    let material = new THREE.PointsMaterial({
        map: starTexture
    });
    material.alphaMap = starTexture;
    material.transparent = true;

    material.depthWrite = false;
    material.blending = THREE.AdditiveBlending;
    material.vertexColors = true;

    material.size = size;
    let points = new THREE.Points(BufferGeometry, material);
    scene.add(points);
    return points;
}

let points1 = createPoints('1', 0.1);

// 坐标轴辅助线
const axisHelper = new THREE.AxesHelper(500);
// scene.add(axisHelper);

let controls = new OrbitControls(camera, renderer.domElement);
// 设置阻尼系数
controls.enableDamping = true;
// 禁止放大缩小
// controls.enableZoom = false;
function render() {
    points1.position.y -= 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();