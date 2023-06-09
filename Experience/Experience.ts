import * as THREE from 'three'

import Camera from './Camera'
import Renderer from './Renderer'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import World from './World/World'
import Resources from './Utils/Resources'
import Raycaster from './Raycaster'
import assets from './Utils/assets'
import Preloader from './PreLoader'
// import Composer from './Composer'

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
  preloader!: Preloader
  // composer!: Composer

  // * Type declarations were added to this parameter to account for the possibility that this could be either an HTMLCanvasElement or null
  // * If you hover over querySelector, you can see that it returns HTMLCanvasElement or null, which is why the parameter has to include it
  constructor (canvas: HTMLCanvasElement | null = document.querySelector('#canvas')) {
    // Singleton Set-up
    if (instance) {
      this.isActive = true
      return instance
    }
    instance = this

    // * guard clauses like these prevent any error that would occur if `canvas` were null, this encourages type safety and removes
    // * errors caused due to a type not having functionality of another (errors like using '.tolowercase()' on a number variable)
    if (canvas === null) { return }

    this.canvas = canvas;
    // * (window as any) is a special case fix, `any` is a magical keyword that handwaives a lot of issues in typescript
    (window as any).experience = this

    this.sizes = new Sizes()
    this.scene = new THREE.Scene()
    this.time = new Time()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.resources = new Resources(assets)
    this.world = new World()
    this.raycaster = new Raycaster()
    this.preloader = new Preloader()
    // this.composer = new Composer()

    // Listens for an event called 'update', see 'Utils/Time.js' for the emit
    this.time.on('update', () => {
      this.update()
    })

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.isActive = true
  }

  resize () {
    if (!this.isActive) { return }
    this.camera.resize()
    this.renderer.resize()
  }

  update () {
    if (!this.isActive) { return }
    this.world.update()
    this.camera.update()
    this.renderer.update()
    // this.composer.update()
  }

  unmount () {
    if (!this.isActive) { return }
    this.isActive = false
    this.sizes.unmount()
    this.renderer.instance.dispose()
    this.raycaster.unmount()
    if (instance != null) {
      instance = null
    }

    (window as any).experience = null
  }
}
