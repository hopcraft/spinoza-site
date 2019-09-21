import './Bubble.scss'
import * as React from 'react'

interface IStyle {
  width?: number
  height?: number
  left?: number
  top?: number
  opacity?: number
}

export interface IBubbleClsProps {
  content: string
  x: number
  y: number
  speedX: number
  speedY: number
  style?: IStyle
  step?: number
}

export const DFT_UNIT = 'px'
export const DFT_WIDTH: number   = 70
export const DFT_HEIGHT: number  = 70
export const DFT_LEFT: number  = 0
export const DFT_TOP: number   = 0
export const DFT_OPACITY: number = 1

export const DFT_STYLE = {
  width: DFT_WIDTH,
  height: DFT_HEIGHT,
  left: DFT_LEFT,
  top: DFT_TOP,
  opacity: DFT_OPACITY
}

export const DFT_STEP = 0

export const APLHA = 0.8
export const POW = [1, APLHA, APLHA * APLHA]

export function speedX(): number {
  return 1 + Math.random() * 0.2
}

export function speedY(): number {
  return 1 + Math.random() * 0.2
}

export class BubbleCls {
  public content: string = ''
  public x: number = 0
  public y: number = 0
  public speedX: number = speedX()
  public speedY: number = speedY()
  public $elem: HTMLElement = document.createElement('span')
  public style: IStyle = DFT_STYLE
  private step: number = DFT_STEP

  constructor(props: IBubbleClsProps) {
    this.style = {
      ...DFT_STYLE,
      ...props.style,
      opacity: 3 * Math.random()
    }
    this.step = 0.02 * Math.random()
    this.content = props.content
    this.$elem.classList.add('bubble')
    this.$elem.classList.add('ball')
    this.$elem.textContent = this.content
    this.$elem.style.left = this.style.left + DFT_UNIT
    this.$elem.style.top = this.style.top + DFT_UNIT
    this.$elem.style.width = this.style.width + DFT_UNIT
    this.$elem.style.height = this.style.height + DFT_UNIT
    // this.$elem.style.transform = `translate(
    //   ${this.style.left + DFT_UNIT}, ${this.style.top + DFT_UNIT}
    // )`
  }

  setX(x: number) {
    this.x = x
    let left = Math.round(x)
    this.style = {
      ...this.style,
      left
    }
    this.$elem.style.left = left + DFT_UNIT
    // this.$elem.style.transform = `translate(
    //   ${left + DFT_UNIT}, ${this.style.top + DFT_UNIT}
    // )`
  }

  setY(y: number) {
    this.y = y
    let top = Math.round(y)
    this.style = {
      ...this.style,
      top
    }
    this.$elem.style.top = top + DFT_UNIT
    // this.$elem.style.transform = `translate(
    //   ${this.style.left + DFT_UNIT}, ${top + DFT_UNIT}
    // )`
  }

  paint() {}
}