import * as THREE from 'three'
import Experience from './Experience'

export default class Raycaster {
  experience: Experience
  scene: any
  resources: any
  camera: any
  sizes: any
  hitBoxMaterial: THREE.MeshBasicMaterial
  loungeMarkerHitBox!: THREE.Mesh<THREE.BoxGeometry, any>
  studioMarkerHitBox!: THREE.Mesh<THREE.BoxGeometry, any>
  cafeMarkerHitBox!: THREE.Mesh<THREE.BoxGeometry, any>
  shopMarkerHitBox!: THREE.Mesh<THREE.BoxGeometry, any>
  raycaster!: THREE.Raycaster
  cursorDown!: THREE.Vector2
  cursor!: THREE.Vector2
  objectsToTest!: any[]
  touchedPoints!: any[]
  cursorXMin!: number
  cursorXMax!: number
  cursorYMin!: number
  cursorYMax!: number
  absX!: number
  absY!: number
  intersectsObjects: any
  selectedModel: any
  rawIntersects: any
  pointer: THREE.Vector2
  constructor () {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.pointer = new THREE.Vector2()

    this.hitBoxMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true })
    // wait for assets to load
    this.resources.on('assets-ready', () => {
      this.loungeMarkerHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.5, 0.35),
        this.hitBoxMaterial
      )
      this.loungeMarkerHitBox.position.set(-0.65, 1.75, -1)
      this.loungeMarkerHitBox.visible = false
      this.scene.add(this.loungeMarkerHitBox)

      this.cafeMarkerHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.5, 0.35),
        this.hitBoxMaterial
      )
      this.cafeMarkerHitBox.position.set(-0.65, 1.55, 1)
      this.cafeMarkerHitBox.visible = false
      this.scene.add(this.cafeMarkerHitBox)

      this.shopMarkerHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.5, 0.35),
        this.hitBoxMaterial
      )
      this.shopMarkerHitBox.position.set(-0.2, 1.35, -0.75)
      this.shopMarkerHitBox.visible = false
      this.scene.add(this.shopMarkerHitBox)

      this.studioMarkerHitBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.5, 0.35),
        this.hitBoxMaterial
      )
      this.scene.add(this.studioMarkerHitBox)
      this.studioMarkerHitBox.position.set(1.5, 1.55, -1)
      this.studioMarkerHitBox.visible = false
      this.scene.add(this.studioMarkerHitBox)

      // raycaster
      this.raycaster = new THREE.Raycaster()
      this.cursorDown = new THREE.Vector2()
      this.cursor = new THREE.Vector2()

      // Objects to test
      this.objectsToTest = [
        this.loungeMarkerHitBox,
        this.cafeMarkerHitBox,
        this.shopMarkerHitBox,
        this.studioMarkerHitBox
      ]

      /// These eventListeners came from jZhou's code, don't know what it does yet though
      this.touchedPoints = []
      window.addEventListener('pointerdown', this.onPointerDown.bind(this))
      window.addEventListener('pointermove', this.onPointerMove.bind(this))
      // Click listener
      window.addEventListener('pointerup', this.onPointerUp.bind(this))
    })
  }

  onPointerUp (event) {
    this.cursor.x = event.clientX / this.sizes.width * 2 - 1
    this.cursor.y = -(event.clientY / this.sizes.height) * 2 + 1

    this.absX = Math.abs(this.cursor.x)
    this.absY = Math.abs(this.cursor.y)

    if (this.touchedPoints.length === 1 &&
            this.absX > this.cursorXMin && this.absX < this.cursorXMax &&
            this.absY > this.cursorYMin && this.absY < this.cursorYMax) {
      this.click(this.cursor)
      this.touchedPoints = []
    } else {
      this.touchedPoints = []
    }
  }

  onPointerDown (event) {
    this.touchedPoints.push(event.pointerId)

    this.cursorXMin = Math.abs((event.clientX / this.sizes.width * 2 - 1) * 0.9)
    this.cursorXMax = Math.abs((event.clientX / this.sizes.width * 2 - 1) * 1.1)

    this.cursorYMin = Math.abs((event.clientY / this.sizes.height * 2 - 1) * 0.9)
    this.cursorYMax = Math.abs((event.clientY / this.sizes.height * 2 - 1) * 1.1)
  }

  onPointerMove (event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(this.pointer, this.camera.instance)
    this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest)

    this.experience.world.markerLounge.unhover()
    this.experience.world.markerCafe.unhover()
    this.experience.world.markerShop.unhover()
    this.experience.world.markerStudio.unhover()

    window.document.querySelector('body').style.cursor = 'default'

    if (this.intersectsObjects.length > 0) {
      this.selectedModel = this.intersectsObjects[0].object

      // Ensures that the first object touched is a hitbox
      // TODO: Remove once better handling of hitboxes is added
      this.rawIntersects = this.raycaster.intersectObjects(this.scene.children)
      if (this.rawIntersects[0].object !== this.selectedModel) {
        return
      }

      switch (this.selectedModel) {
        case this.loungeMarkerHitBox:
          this.experience.world.markerLounge.hover()
          window.document.querySelector('body').style.cursor = 'pointer'
          break
        case this.cafeMarkerHitBox:
          this.experience.world.markerCafe.hover()
          window.document.querySelector('body').style.cursor = 'pointer'

          break
        case this.shopMarkerHitBox:
          this.experience.world.markerShop.hover()
          window.document.querySelector('body').style.cursor = 'pointer'

          break
        case this.studioMarkerHitBox:
          this.experience.world.markerStudio.hover()
          window.document.querySelector('body').style.cursor = 'pointer'
          break
      }
    }
  }

  unmount () {
    window.removeEventListener('pointerdown', this.onPointerDown)
    window.removeEventListener('pointermove', this.onPointerMove)
    window.removeEventListener('pointerup', this.onPointerUp)
  }

  click (cursor: THREE.Vector2) {
    this.raycaster.setFromCamera(cursor, this.camera.instance)
    this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest)

    if (this.intersectsObjects.length > 0) {
      this.selectedModel = this.intersectsObjects[0].object

      // Ensures that the first object touched is a hitbox
      // TODO: Remove once better handling of hitboxes is added
      this.rawIntersects = this.raycaster.intersectObjects(this.scene.children)
      if (this.rawIntersects[0].object !== this.selectedModel) {
        return
      }

      switch (this.selectedModel) {
        case this.loungeMarkerHitBox:
          window.dispatchEvent(new Event('toggle-lounge'))
          break
        case this.cafeMarkerHitBox:
          window.dispatchEvent(new Event('toggle-cafe'))
          break
        case this.shopMarkerHitBox:
          window.dispatchEvent(new Event('toggle-shop'))
          break
        case this.studioMarkerHitBox:
          window.dispatchEvent(new Event('toggle-studio'))
          break
      }
    }
  }
}
