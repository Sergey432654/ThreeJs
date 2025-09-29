import * as THREE from 'three'
import { color, shininess } from 'three/tsl';


const scene = new THREE.Scene();

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
const material = new THREE.MeshBasicMaterial({color: 'purple' });
const sphereMath = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 'red',
    shininess: 100,
    emissive: "white"
})
const sphere = new THREE.Mesh(sphereMath, sphereMaterial);
const cube = new THREE.Mesh(geometry,material);
const cube1 = new THREE.Mesh(geometry,material);
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1.2, 0.6, 16, 100),
    new THREE.MeshBasicMaterial({
        color: 'white',
        shininess: 100
    }))

scene.add(cube, sphere, torus );
cube.position.set(-3,1,0);
sphere.position.set(1,0,0);
torus.position.set(2,2,1)
function animate(){
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    torus.rotation.x += 0.01
    torus.rotation.y += 0.01

    renderer.render(scene,camera);
}
animate();