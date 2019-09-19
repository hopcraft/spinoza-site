
export default class Meteor {
  element: HTMLElement
  x: number
  y: number
  scale: number
  speed: number
  factor: number

  constructor(factor: number) {
    this.factor = factor
    this.element = document.createElement('div'); 
    this.element.classList.add('meteor'); 
    this.x = 0; 
    this.y = 0; 
    this.scale = 1; 
    this.speed = 0; 
    this.reset(); 
    this.y = Math.random() * -75; 
    this.move(); 
  }

  reset() {
    this.x = Math.random() * (window.innerWidth || 1000)
    this.y = 0
    this.scale = Math.random() * 0.6 + 0.4
    this.speed = this.scale * this.scale * 2.5
  }

  move() {
    this.y += this.speed

    let translate3d = `translate3d(${this.x + 'px,' + (this.y - 198)}px, 0)` 
    let scale = `scale(${this.scale * this.factor})`
    let transform = `${translate3d} ${scale}`
    let opacity = 1.4 - this.y / 340

    this.element.style.webkitTransform = transform
    this.element.style.transform = transform
    this.element.style.opacity = `${opacity}`

    if (opacity <= 0) { 
      this.reset()
    } 
  }
}