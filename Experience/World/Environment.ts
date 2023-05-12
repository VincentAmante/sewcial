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
    this.sunLight = new THREE.DirectionalLight('#E792C1', 2)

    // Can decide sharpness of shadow
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.camera.near = 0.5
    this.sunLight.shadow.camera.left = -10
    this.sunLight.shadow.camera.right = 10
    this.sunLight.shadow.camera.top = 10
    this.sunLight.shadow.camera.bottom = -10
    this.sunLight.shadow.radius = 5
    this.sunLight.shadow.blurSamples = 5

    this.sunLight.shadow.mapSize.set(768, 768)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(1, 10, -3)
    this.scene.add(this.sunLight)

    // Adds soft light to everything, most affects shadow light
    this.ambientLight = new THREE.AmbientLight('#E792C1', 2)
    this.scene.add(this.ambientLight)
  }
}
