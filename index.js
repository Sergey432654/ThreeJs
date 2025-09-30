import * as THREE from 'three'
import { color, emissive, shininess } from 'three/tsl';
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene();

//const ambienLight = new THREE.AmbientLight('white', 0.5);
//scene.add(ambienLight)

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

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({color: 'purple' });
const originMaterial = new THREE.MeshStandardMaterial({color: 'red'});
const hightOriginMaterial = new THREE.MeshStandardMaterial({color: 'yellow', emissive: 'white', emissiveIntensity: 0.5});
const cube = new THREE.Mesh(geometry,originMaterial);
//scene.add(cube);
cube.position.set(0,0,0);
const raycast = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1 ;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1 ;
}
window.addEventListener('mousemove', onMouseClick)
let state = false;
function animate(){
    requestAnimationFrame(animate);
    raycast.setFromCamera(mouse, camera);
    const intersects = raycast.intersectObject(cube)
    if(intersects.length > 0 && !state){
        cube.material = hightOriginMaterial;
        state = true
        gsap.to(cube.scale, {x: 1.5 , y: 1.5 , z: 1.5 , duration: 1.5 , ease: "power1.out"})
    }
    else if(intersects.length == 0 && state){
        cube.material = originMaterial;
        state = false
        gsap.to(cube.scale, {x: 1 , y: 1, z: 1 , duration: 1.5 , ease: "power1.out"})
    }
    renderer.setClearColor('blue')
    controls.update();
    renderer.render(scene,camera);
}
animate();