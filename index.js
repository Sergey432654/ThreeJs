import * as THREE from 'three'
import { color, shininess } from 'three/tsl';


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
camera.position.z = 5 ;
const renderer  = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({color: 'purple' });
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);
cube.position.set(0,0,0);

function animate(){
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene,camera);
}
animate();