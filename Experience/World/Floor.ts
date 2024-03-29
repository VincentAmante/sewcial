import * as THREE from 'three'
import Experience from '../Experience'

export default class Floor {
  experience: Experience
  scene: any
  geometry!: THREE.PlaneGeometry
  material!: THREE.MeshStandardMaterial
  plane!: THREE.Mesh<any, any>

  constructor () {
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.setFloor()
  }

  setFloor () {
    this.geometry = new THREE.PlaneGeometry(100, 100)
    // this.material = new THREE.MeshStandardMaterial({
    //   color: 0x607BDA,
    //   side: THREE.BackSide
    // })
    this.material = new THREE.ShadowMaterial({
      side: THREE.BackSide
    })
    this.material.opacity = 0.2
    this.plane = new THREE.Mesh(
      this.geometry,
      this.material
    )
    this.plane.rotation.x = Math.PI / 2
    this.plane.position.y = -0.2
    this.plane.receiveShadow = true
    this.scene.add(this.plane)
  }
}
