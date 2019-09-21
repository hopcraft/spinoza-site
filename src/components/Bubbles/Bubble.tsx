import './Bubble.scss'
import * as React from 'react'

interface IStyle {
  width: number
  height: number
  left: number
  top: number
  opacity: number
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

export class BubbleCls {
  public content: string = ''
  public x: number = 0
  public y: number = 0
  public speedX: number = 0
  public speedY: number = 0
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
  }

  setX(x: number) {
    this.x = x
    this.style.left = Math.random() * x
  }

  setY(y: number) {
    this.y = y
    this.style.top = Math.random() * y
  }

  paint() {
    for (let i = 0; i < POW.length; i++) {
      let v = Math.abs(Math.sin(this.style.opacity += this.step * Math.random()))
      v *= POW[i]
      v = ((v * 1e4) >> 0) / 1e4
      this.style.opacity = v
    }
  }
}

interface IProps {
  style?: IStyle
  content?: string
}

interface IState {}

export default class Bubble extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const { style = DFT_STYLE, content } = this.props
    return (
      <span className="bubble ball effect" style={style}>
        {content}
      </span>
    )
  }
}