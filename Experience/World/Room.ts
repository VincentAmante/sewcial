import * as THREE from 'three'
import Experience from '../Experience'
import Resources from '../Utils/Resources'

export default class Room {
  experience: Experience
  scene: any
  resources: Resources
  room: any
  actualRoom: any

  constructor () {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.room = this.resources.items.room
    this.actualRoom = this.room.scene

    this.setModel()
  }

  setModel () {
    this.actualRoom.children.forEach((child: any) => {
      child.castShadow = true
      child.receiveShadow = true

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true
          groupChild.receiveShadow = true
        })
      }

      if (child.name === 'WindowGlass' ||
      child.name === 'WindowGlass2' ||
      child.name === 'WindowGlass3') {
        child.material = new THREE.MeshPhysicalMaterial()
        child.material.roughness = 0
        child.material.color.set(0xFFFFFF)
        child.material.ior = 3
        child.material.transmission = 1
        child.material.opacity = 1
      }
    })

    this.scene.add(this.actualRoom)
  }
}
