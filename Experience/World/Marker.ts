import * as THREE from 'three'
import Experience from '../Experience'

export default class Marker {
  experience: Experience
  scene: any
  resources: any
  marker: any
  location: {
    x: number
    y: number
    z: number
  }

  name: string

  constructor (markerName: string) {
    this.name = markerName
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.marker = this.resources.items[`marker${this.name}`].scene
    this.location = {
      x: 0,
      y: 0,
      z: 0
    }

    this.setModel()
  }

  setModel () {
    this.marker.children.forEach((child: any) => {
      child.castShadow = true
      child.receiveShadow = true

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true
          groupChild.receiveShadow = true
        })
      }
    })

    this.marker.rotation.y = Math.PI / 180 * 40
    this.marker.position.set(this.location.x, this.location.y, this.location.z)
    this.scene.add(this.marker)
  }

  setLocation (x: number, y: number, z: number) {
    this.location.x = x
    this.location.y = y
    this.location.z = z
    this.marker.position.set(x, y, z)
  }

  hover () {
    this.scene.remove(this.marker)
    this.marker = this.resources.items[`marker${this.name}Hovered`].scene
    this.setModel()
  }

  unhover () {
    this.scene.remove(this.marker)
    this.marker = this.resources.items[`marker${this.name}`].scene
    this.setModel()
  }
}
