import * as THREE from "three"
import { Mesh, MeshBasicMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap";
// 我们的目标

/**
 * 1. 创建场景
 * 2. 创建相机
 * 3. 创建物体
 * 4. 创建渲染器
 * 5. 轨道控制器
 */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);
scene.add(camera);

var geometry = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 });
var cube = new Mesh(geometry, material);
scene.add(cube);
cube.position.set(5, 5, 5);

let light = new THREE.PointLight(0xff00ff, 1, 1000, 2);
cube.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
// 设置阻尼
controls.enableDamping = true;

let clock = new THREE.Clock();

function render() {
    let time = clock.getElapsedTime();
    // cube.position.x = Math.sin(time * 4) * 5;
    // cube.position.z = Math.cos(time * 4) * 5;
    // cube.position.y = Math.cos(time * 4) + 4;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}


const axisHelper = new THREE.AxesHelper(500);
scene.add(axisHelper);

// const animation1 = gsap.to(cube.position, {
//     duration: 2,
//     x: 10,
//     yoyo: true,
//     repeat: -1,
//     ease: "power1.easeInOut"
// });

let fullScreen = false
// window.onclick = () => {
//     if (fullScreen) {
//         document.exitFullscreen();
//     } else {
//         renderer.domElement.requestFullscreen();
//     }

//     fullScreen = !fullScreen;
//     if (animation1.isActive()) {
//         animation1.pause();
//     } else {
//         animation1.resume();
//     }
// }

window.ondblclick = function () {
}

render();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}, false);