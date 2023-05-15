import { EventEmitter } from 'events'
import * as THREE from 'three'
import Experience from './Experience'
import Resources from './Resources'
import Preloader from './Preloader'

export default class Preloader extends EventEmitter {
  experience: Experience
  resources: Resources
  progressRatio: number

  constructor () {
    super()

    this.experience = new Experience()
    this.resources = this.experience.resources

    this.resources.on('item-loaded', async () => {
      this.progressRatio = ((this.resources.loaded + 1) / this.resources.queue) * 100
      const progressBar = document.querySelector('#loading-bar')
      if (progressBar) { progressBar.innerHTML = `${Math.round(this.progressRatio)}%` }

      if (this.progressRatio === 100) {
        const loadingType = document.querySelector('#loading-type')
        if (loadingType) { loadingType.innerHTML = 'Assets Loaded' }
      }
    })

    this.resources.on('assets-ready', () => {
      this.sleep(200).then(() => {
        const loadingType = document.querySelector('#loading-type')
        if (loadingType) { loadingType.innerHTML = 'Loading World' }

        this.sleep(1200).then(() => {
          window.dispatchEvent(new Event('done-loading'))
        })
      })
    })
  }

  sleep (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
