import * as THREE from 'three'
import Experience from './Experience'

export default class Raycaster {
    experience: Experience
    scene: any
    resources: any
    camera: any
    sizes: any
    hitBoxMaterial: THREE.MeshBasicMaterial
    chairHitBox!: THREE.Mesh<THREE.BoxGeometry, any>
    plantHitBox!: THREE.Mesh<THREE.BoxGeometry, any>
    windowHitBox!: THREE.Mesh<THREE.BoxGeometry, any>
    giftHitBox!: THREE.Mesh<THREE.BoxGeometry, any>
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

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes

        this.hitBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true} )
        // wait for assets to load
        this.resources.on('assets-ready', () => {
            // chairHitBox
            this.chairHitBox = new THREE.Mesh(
                new THREE.BoxGeometry(.35, .5, .35),
                this.hitBoxMaterial
            )
            this.chairHitBox.position.set(.3, .25, .7)
            this.chairHitBox.rotation.y = Math.PI * .4
            this.chairHitBox.visible = false
            // this.scene.add(this.chairHitBox)

            this.plantHitBox = new THREE.Mesh(
                new THREE.BoxGeometry(.35, .55, .35),
                this.hitBoxMaterial   
            )
            this.plantHitBox.position.set(-2.2, .35, 1)
            this.plantHitBox.visible = false
            // this.scene.add(this.plantHitBox)


            this.windowHitBox = new THREE.Mesh(
                new THREE.BoxGeometry(.55, .55, .3),
                this.hitBoxMaterial
            )
            this.windowHitBox.position.set(-.45, .61, -.35)
            this.windowHitBox.visible = false
            // this.scene.add(this.windowHitBox)

            this.giftHitBox = new THREE.Mesh(
                new THREE.BoxGeometry(.5, .5, .5),
                this.hitBoxMaterial
            )
            this.giftHitBox.position.set(1.85, .25, .5)
            this.giftHitBox.visible = false
            this.scene.add(this.giftHitBox)

            // raycaster
            this.raycaster = new THREE.Raycaster()
            this.cursorDown = new THREE.Vector2()
            this.cursor = new THREE.Vector2()

            // Objects to test
            this.objectsToTest = [
                this.chairHitBox,
                this.plantHitBox,
                this.windowHitBox,
                this.giftHitBox
            ]

            /// These eventListeners came from jZhou's code, don't know what it does yet though
            this.touchedPoints = []
            window.addEventListener('pointerdown', (event) =>
            {   
                this.touchedPoints.push(event.pointerId)

                this.cursorXMin = Math.abs((event.clientX / this.sizes.width * 2 - 1)*0.9)
                this.cursorXMax = Math.abs((event.clientX / this.sizes.width * 2 - 1)*1.1)

                this.cursorYMin = Math.abs((event.clientY / this.sizes.height * 2 - 1)*0.9)
                this.cursorYMax = Math.abs((event.clientY / this.sizes.height * 2 - 1)*1.1)

            })

            // Click listener
            window.addEventListener('pointerup', (event) =>
            {
                this.cursor.x = event.clientX / this.sizes.width * 2 - 1
                this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1

                this.absX = Math.abs(this.cursor.x)
                this.absY = Math.abs(this.cursor.y)

                if (this.touchedPoints.length === 1 && 
                this.absX > this.cursorXMin && this.absX < this.cursorXMax &&
                this.absY > this.cursorYMin && this.absY < this.cursorYMax) {

                    this.click(this.cursor)
                    this.touchedPoints = []
                }
                else {

                    this.touchedPoints = []
                }
            })
        })
    }

    click(cursor: THREE.Vector2){
        this.raycaster.setFromCamera(cursor, this.camera.instance)
        this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest)

        if (this.intersectsObjects.length > 0){
            this.selectedModel = this.intersectsObjects[0].object

            // Ensures that the first object touched is a hitbox
            // TODO: Remove once better handling of hitboxes is added
            this.rawIntersects = this.raycaster.intersectObjects(this.scene.children)
            if (this.rawIntersects[0].object !== this.selectedModel){
                return
            }

            switch(this.selectedModel){

                case this.giftHitBox:
                    window.dispatchEvent(new Event('triggerMessage'))
                    break;
            }
        }
    }
}