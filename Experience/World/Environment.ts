import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment {
  experience: Experience
  scene: any
  resources: any
  sunLight!: THREE.DirectionalLight
  ambientLight!: THREE.AmbientLight

  constructor () {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.setSunlight()
  }

  setSunlight () {
    // Adds hard lighting, creates shadows
    this.sunLight = new THREE.DirectionalLight('#E792C1', 1.5)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20

    // Can decide sharpness of shadow
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(5, 18, 3)
    this.scene.add(this.sunLight)

    // Adds soft light to everything, most affects shadow light
    this.ambientLight = new THREE.AmbientLight('#E792C1', 2.5)
    this.scene.add(this.ambientLight)
  }
}
