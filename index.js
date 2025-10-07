import * as THREE from 'three'
import { color, emissive, shininess } from 'three/tsl';
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/Addons.js';
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const ambienLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambienLight)

const dirlight = new THREE.DirectionalLight('white', 1);
scene.add(dirlight)
dirlight.position.set(5,5,5)

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight,
    0.1,
    100,
)



const loader = new GLTFLoader()
loader.load(

    'vvv/scene.gltf',
    (gltf) => {
        const model = gltf.scene
        model.scale.set(1,1,1)
        model.position.set(0,-1,0)
        scene.add(model)
    },
    (xhr) => {
        console.log(xhr.loaded / xhr.total * 100 + '% loaded')
    },
    (error) =>{
        console.error('Error' + error)
    }
)


camera.position.z = 5 ;
const renderer  = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 10 ;
//scene.add(cube);
const raycast = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
)
const composer = new EffectComposer(renderer)
composer.addPass(renderPass)
composer.addPass(bloomPass)



function onMouseClick(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1 ;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1 ;
}
window.addEventListener('mousemove', onMouseClick)
function animate(){
    requestAnimationFrame(animate);
    raycast.setFromCamera(mouse, camera);
    renderer.setClearColor('blue')
    controls.update();
    composer.render();
}
animate();