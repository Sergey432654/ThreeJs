import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const scene = new THREE.Scene();

const ambienLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambienLight)

const dirlight = new THREE.DirectionalLight('white', 1);
dirlight.position.set(5,5,5)
scene.add(dirlight)

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




function animate(){
    requestAnimationFrame(animate);
    
   
    renderer.setClearColor('blue')

    renderer.render(scene,camera);
}
animate();