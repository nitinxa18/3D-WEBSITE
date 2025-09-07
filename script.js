import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';


let scene, camera, renderer, loader, currentCar;
let carIndex = 0;
const carModels = [
    'models/bmw_m4.glb',
    'models/lambo.glb',
    'models/bm.glb'
];

init();
loadCar(carModels[carIndex]);
animate();

document.getElementById('prevBtn').addEventListener('click', () => switchCar(-1));
document.getElementById('nextBtn').addEventListener('click', () => switchCar(1));

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('carCanvas'), antialias: true });
    renderer.setSize(window.innerWidth * 0.8, 500);

    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(5, 10, 7);
    scene.add(light1);

    const light2 = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light2);

    loader = new THREE.GLTFLoader();
}

function loadCar(modelPath) {
    if (currentCar) scene.remove(currentCar);

    loader.load(modelPath, function(gltf) {
        currentCar = gltf.scene;
        currentCar.scale.set(1.5,1.5,1.5);
        scene.add(currentCar);
    }, undefined, function(error) {
        console.error(error);
    });
}

function switchCar(direction) {
    carIndex += direction;
    if (carIndex < 0) carIndex = carModels.length - 1;
    if (carIndex >= carModels.length) carIndex = 0;
    loadCar(carModels[carIndex]);
}

function animate() {
    requestAnimationFrame(animate);
    if (currentCar) currentCar.rotation.y += 0.01;
    renderer.render(scene, camera);
}




