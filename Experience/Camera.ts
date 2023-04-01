import * as THREE from 'three'
import Experience from './Experience'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PerspectiveCamera } from 'three'
import type Sizes from './Utils/Sizes'

export default class Camera {

    // * Defining some as being capable of being `null` or `undefined` erases typescript's worries that the values aren't initialised

    experience: Experience
    scene: THREE.Scene
    sizes: Sizes
    canvas: HTMLCanvasElement | null
    instance: any
    perspectiveCamera: THREE.PerspectiveCamera | undefined
    frustrum: number | undefined
    orthographicCamera: THREE.OrthographicCamera | undefined
    controls: OrbitControls | undefined
    cam: boolean | undefined

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.canvas = this.experience.canvas
        
        this.setInstance()
        this.setControls()
    }


    setInstance(){
        // Switch between either perspective or ortho
        this.instance = this.createOrthographicCamera()

        this.instance.position.x = -10
        this.instance.position.y = -6.8
        this.instance.position.z = -15
        console.log(this.instance.position)

        this.scene.add(this.instance)
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000)
        return this.perspectiveCamera
    }

    createOrthographicCamera(){
        this.sizes.frustrum = 5
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -100,
            100
        )

        return this.orthographicCamera;
    }

    resize(){
        if (this.perspectiveCamera != null){
            this.perspectiveCamera.aspect = this.sizes.aspect
            this.perspectiveCamera.updateProjectionMatrix()   
        }

        // Guard clauses
        if (this.orthographicCamera == null) {
            return
        };
        if (this.sizes.frustrum == null) {
            return
        };
        
        this.sizes.frustrum = 5;
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2
        this.orthographicCamera.right =  (this.sizes.aspect * this.sizes.frustrum) / 2
        this.orthographicCamera.top = this.sizes.frustrum / 2
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2

        this.instance = this.orthographicCamera
    }

    setControls()
    {
        if (this.canvas === null) return;

        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = false
        this.controls.rotateSpeed = 0.075
        this.controls.zoomSpeed = 0.8
        this.controls.target.z = -1
        this.controls.enableRotate = true
        this.controls.enableZoom = true

        // Set Limitations
        this.controls.minDistance = 7
        this.controls.maxDistance = 50
        this.controls.minAzimuthAngle = Math.PI * 0.2 
        this.controls.maxAzimuthAngle = Math.PI * 0.25
        this.controls.minPolarAngle = Math.PI *0.35
        this.controls.maxPolarAngle = Math.PI * 0.40
        this.controls.maxZoom = 1.5
        this.controls.minZoom = .9
        this.cam = false
    }

    update(){
        if (this.controls === null || this.controls === undefined) return;
        this.instance.updateProjectionMatrix()
        this.controls.update()
    }
}