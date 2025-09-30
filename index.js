import * as THREE from 'three'
import { color, shininess } from 'three/tsl';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


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
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 10 ;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({color: 'purple' });
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);
cube.position.set(0,0,0);
const raycast = new THREE.Raycaster();
const mouse = new THREE.Vector2();
function onMouseClick(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1 ;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1 ;
    raycast.setFromCamera(mouse, camera);
    const intersects = raycast.intersectObjects(scene.children)
    if(intersects.length > 0)
        intersects[0].object.material.color.set('blue')
    
}
window.addEventListener('click', onMouseClick)
function animate(){
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01


    
    controls.update();
    renderer.render(scene,camera);
}
animate();