import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import Experience from './Experience'
import Renderer from './Renderer'
import { Sizes } from './Utils/Sizes'

export default class Composer {
  experience: Experience
  renderer: Renderer
  composer: EffectComposer
  sizes: Sizes

  constructor () {
    this.experience = new Experience()
    this.renderer = this.experience.renderer
    this.sizes = this.experience.sizes

    this.setComposer()
  }

  setComposer () {
    this.composer = new EffectComposer(this.renderer.instance)
    const renderPass = new RenderPass(this.experience.scene, this.experience.camera.instance)
    this.composer.addPass(renderPass)

    const smaaPass = new SMAAPass(this.sizes.width, this.sizes.height)
    this.composer.addPass(smaaPass)
  }

  update () {
    this.composer.render()
  }
}
