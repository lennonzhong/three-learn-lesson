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


let raycaster = new THREE.Raycaster();
// 监听鼠标的位置
let mousePos = new THREE.Vector2();
document.addEventListener("click", (e) => {
    let x = e.clientX / window.innerWidth * 2 - 1;
    let y = e.clientY / window.innerHeight * 2 - 1;
    mousePos.set(x, -y);

    raycaster.setFromCamera(mousePos, camera);
    let objects = raycaster.intersectObjects(scene.children);
    let meshArr = objects.filter(item => item.object.type === "cube")
    if (meshArr.length) {
        let mesh = meshArr[0];
        mesh.object.material = redMaterial
    }
})

let basicMaterial = new THREE.MeshBasicMaterial({
    wireframe: true
})

let redMaterial = new THREE.MeshBasicMaterial({
    color: "red"
})

let geometry = new THREE.BoxGeometry(1, 1, 1);

for (let i = -5; i < 5; i++) {
    for (let j = -5; j < 5; j++) {
        for (let z = -5; z < 5; z++) {
            let mesh = new THREE.Mesh(geometry, basicMaterial);
            mesh.type = "cube";
            mesh.position.set(i, j, z)
            scene.add(mesh);
        }
    }
}

// 坐标轴辅助线
const axisHelper = new THREE.AxesHelper(500);
scene.add(axisHelper);

let controls = new OrbitControls(camera, renderer.domElement);
// 设置阻尼系数
controls.enableDamping = true;
// 禁止放大缩小
// controls.enableZoom = false;
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();