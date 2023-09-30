import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
scene.add(camera);
camera.lookAt(0, 0, 0);
camera.position.set(0, 0, 20);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

let textureLoader = new THREE.TextureLoader();
let snowSprint = textureLoader.load("./assets/1.png");

let geometry = null;
let material = null;


const params = {
    count: 5000,
    radius: 20,
    branch: 6,
    startColor: "purple",
    endColor: 0xffffff,
    size: 0.5
}

const generateGalaxy = () => {
    let positions = new Float32Array(params.count * 3);
    let colors = new Float32Array(params.count * 3);
    for (let i = 0; i < params.count; i++) {
        let branch = i % params.branch;
        let angle = branch * (Math.PI * 2 / params.branch);

        let randomRadius = Math.random() * params.radius;

        let randomX = Math.pow(Math.random() * 2 - 1, 3);
        let randomY = Math.pow(Math.random() * 2 - 1, 3);
        let randomZ = Math.pow(Math.random() * 2 - 1, 3);

        let index = i * 3;
        positions[index] = randomRadius * Math.cos(angle + randomRadius * 0.1) + randomX * (params.radius - randomRadius) * 0.5;
        positions[index + 1] = randomY;
        positions[index + 2] = randomRadius * Math.sin(angle + randomRadius * 0.1) + randomZ * (params.radius - randomRadius) * 0.5;

        let startColor = new THREE.Color(params.startColor);
        let mixColor = startColor.clone();
        mixColor.lerp(new THREE.Color(params.endColor), randomRadius / params.radius);
        colors[index] = mixColor.r;
        colors[index + 1] = mixColor.g;
        colors[index + 2] = mixColor.b;
    }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    material = new THREE.PointsMaterial({
        size: params.size,
        transparent: true,
        map: snowSprint,
        alphaMap: snowSprint,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    });
    let points = new THREE.Points(geometry, material);
    scene.add(points)
    return points;
}
let points = generateGalaxy();

// 坐标轴辅助线
const axisHelper = new THREE.AxesHelper(500);
scene.add(axisHelper);

let controls = new OrbitControls(camera, renderer.domElement);
// 设置阻尼系数
controls.enableDamping = true;
// 禁止放大缩小
// controls.enableZoom = false;
function render() {
    points.rotation.y += 0.001
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();