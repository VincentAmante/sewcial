import * as THREE from 'three'

import Camera from './Camera'
import Renderer from './Renderer'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import World from './World/World'
import Resources from './Utils/Resources'
import Raycaster from './Raycaster'
import assets from './Utils/assets'

let instance: Experience | null = null

export default class Experience {

    // * Ignore all these, these type-declarations are just so errors can go away in the editor
    // * The ! indicates these were fixed via defintive assignments
    canvas!: HTMLCanvasElement 
    sizes!: Sizes
    scene!: THREE.Scene
    time!: Time
    camera!: Camera
    renderer!: Renderer
    resources!: Resources
    world!: World
    raycaster!: Raycaster
    isActive: Boolean = true
    
    // * Type declarations were added to this parameter to account for the possibility that this could be either an HTMLCanvasElement or null
    // * If you hover over querySelector, you can see that it returns HTMLCanvasElement or null, which is why the parameter has to include it 
    constructor(canvas: HTMLCanvasElement | null = document.querySelector('#canvas')) {

        // Singleton Set-up
        if (instance){ 
            return instance
        }
        instance = this

        // * guard clauses like these prevent any error that would occur if `canvas` were null, this encourages type safety and removes
        // * errors caused due to a type not having functionality of another (errors like using '.tolowercase()' on a number variable)
        if (canvas === null) return;
        
        this.canvas = canvas;
        // * (window as any) is a special case fix, `any` is a magical keyword that handwaives a lot of issues in typescript
        (window as any).experience = this;

        this.sizes = new Sizes()
        this.scene = new THREE.Scene()
        this.time = new Time()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(assets)
        this.world = new World()
        this.raycaster = new Raycaster()

        // const gridHelper = new THREE.GridHelper(200, 50)
        // this.scene.add(gridHelper)
        // const axesHelper = new THREE.AxesHelper(10)
        // this.scene.add(axesHelper)

        // Listens for an event called 'update', see 'Utils/Time.js' for the emit
        this.time.on('update', () => {
            this.update()
        })

        this.sizes.on('resize', () => {
            this.resize()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update(){
        this.camera.update()
        this.renderer.update()
    }

    unmount(){
        if (instance != null){
            instance = null
        }
        (window as any).experience = null

        console.log('unmounting..')
        console.log('instance: ', instance)
        console.log('window.experience: ', (window as any).experience)
    }
}