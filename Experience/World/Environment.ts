import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment {
  experience: Experience
  scene: any
  resources: any
  sunLight!: THREE.DirectionalLight
  sunLightSecondary!: THREE.DirectionalLight
  ambientLight!: THREE.AmbientLight
  hemisphereLight!: THREE.HemisphereLight

  constructor () {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.setSunlight()
  }

  setSunlight () {
    // Adds hard lighting, creates shadows
    this.sunLight = new THREE.DirectionalLight('#C83574', 3.25)

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

    this.sunLightSecondary = new THREE.DirectionalLight('#FBD826', 0.5)
    this.sunLightSecondary.position.set(15, 10, 2)
    this.scene.add(this.sunLightSecondary)

    // Adds soft light to everything, most affects shadow light
    this.hemisphereLight = new THREE.HemisphereLightProbe('#607BDA', '#C83574', 0.5)
    this.scene.add(this.hemisphereLight)
  }
}
