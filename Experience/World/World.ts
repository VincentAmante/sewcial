import * as THREE from 'three'
import Experience from '../Experience'

// Objects in World
import Room from './Room.js'
import Environment from './Environment'
import Floor from './Floor'
import Marker from './Marker'

export default class World {
  experience: Experience
  canvas: any
  sizes: any
  scene: any
  camera: any
  resources: any
  room!: Room
  environment!: Environment
  floor!: Floor
  markerLounge!: Marker
  markerCafe!: Marker
  markerShop!: Marker
  markerStudio!: Marker

  constructor () {
    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.resources = this.experience.resources

    // Creates all models when assets are ready
    this.resources.on('assets-ready', () => {
      this.room = new Room()
      this.environment = new Environment()
      // this.floor = new Floor()
      this.markerLounge = new Marker('Lounge')
      this.markerLounge.setLocation(-0.75, 1.75, -1.15)

      this.markerCafe = new Marker('Cafe')
      this.markerCafe.setLocation(-0.65, 1.6, 1)

      this.markerShop = new Marker('Shop')
      this.markerShop.setLocation(-0.2, 1.4, -0.75)

      this.markerStudio = new Marker('Studio')
      this.markerStudio.setLocation(1.5, 1.6, -1)
    })
  }

  update () {
    if (this.markerLounge) {
      this.markerLounge.update()
      this.markerCafe.update()
      this.markerShop.update()
      this.markerStudio.update()
    }
  }

  resize () {}
}
