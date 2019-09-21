import "./index.scss"
import * as React from "react"
import { 
  IBubbleClsProps, BubbleCls, DFT_WIDTH, DFT_HEIGHT,
  speedX, speedY
} from './Bubble'
import { requestAnimationFrame } from '../../utils'
import { throwStatement } from "@babel/types";

export interface IProps {}
export interface IState {
  bubbles: BubbleCls[]
}

const K = 0.999
const POW_RATE = 0.0001 		//补偿概率
const POW_RANGE = 0.8 		  //补偿范围
const BUBBLES_CONTENT = [
  '物理',
  '数学',
  '计算',
  '哲学',
  '文学',
  '商业'
]
const bubbles: BubbleCls[] = []

let requestAFrameId: number = -1
let oRight: number = 0
let oBottom: number = 0

export default class Bubbles extends React.Component<IProps, IState> {

  state: IState = {
    bubbles: []
  }

  constructor(props: any) {
    super(props)
    this.update = this.update.bind(this)
  }

  componentDidMount(){
    this.init()
  }

  requestFrame(call: Function, time: number) {
    let last = (new Date).getTime()
    let delay = 0

    return setInterval(function () {
      var cur = (new Date).getTime()
      delay += (cur - last)
      last = cur

      if (delay >= time) {
        call()
        delay %= time
      }
    }, 25)
  }


  init() {
    for (let i = 0; i < BUBBLES_CONTENT.length; i++) {
      let timerId = setTimeout(() => {
        let x = i * 50
        let y = i * 50
        let bubble = new BubbleCls({
          content: BUBBLES_CONTENT[i],
          style: {
            left: x,
            top: y
          },
          x: x,
          y: y,
          speedX: speedX(),
          speedY: speedY()
        })
        bubbles.push(bubble)
        this.appendBubble(bubble)
        this.setState({
          bubbles: bubbles
        })
        clearTimeout(timerId)
      }, i * 1000)
    }
    this.addEvent()
    // this.requestFrame(this.update, 25)
    this.update()
  }

  addEvent() {
    let $container = this.refs.bubblesContainerRef as HTMLElement
    $container.addEventListener('click', (e) => {
      console.log('事件发生 e =', e)
    }, false)
  }

  update() {
    const { bubbles } = this.state
    let n = bubbles.length
    let bubble: BubbleCls

    this.updateWall()
    
    for (let i = 0; i < n; i++) {
      bubble = bubbles[i]

      bubble.paint()

      bubble.speedX *= K
      bubble.speedY *= K

      if (Math.random() < POW_RATE) {
        bubble.speedX = speedX() * (1 + Math.random() * POW_RANGE)
        bubble.speedY = speedY() * (1 + Math.random() * POW_RANGE)
      }

      bubble.setX(bubble.x + bubble.speedX)
      bubble.setY(bubble.y + bubble.speedY)
    
      this.checkWalls(bubble)
    }

    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        this.checkCollision(bubbles[i],  bubbles[j])
      }
    }

    requestAFrameId = requestAnimationFrame(this.update)
  }

  appendBubble(bubble: BubbleCls) {
    let $container = this.refs.bubblesContainerRef as HTMLElement
    $container.appendChild(bubble.$elem)
  }

  updateWall() {
    let $elem = this.refs.bubblesContainerRef as HTMLElement
    oRight = $elem.clientWidth - DFT_WIDTH
    oBottom = $elem.clientHeight - DFT_WIDTH
  }

  checkWalls(bubble: BubbleCls) {
    if (bubble.x < 0) {
      bubble.setX(0)
      bubble.speedX *= -1
    } else if (bubble.x > oRight) {
      bubble.setX(oRight)
      bubble.speedX *= -1
    }

    if (bubble.y < 0) {
      bubble.setY(0)
      bubble.speedY *= -1
    } else if (bubble.y > oBottom) {
      bubble.setY(oBottom)
      bubble.speedY *= -1
    }
  }

  checkCollision(bubbleA :BubbleCls, bubbleB :BubbleCls) {
    let dx = bubbleB.x - bubbleA.x
    let dy = bubbleB.y - bubbleA.y
    let dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < DFT_WIDTH) {
      let angle = Math.atan2(dy, dx)
      let sin = Math.sin(angle)
      let cos = Math.cos(angle)

      let posA = { x: 0, y: 0 }
      let posB = this.rotate(dx, dy, sin, cos, true)

      let velA = this.rotate(bubbleA.speedX, bubbleA.speedY, sin, cos, true)
      let velB = this.rotate(bubbleB.speedX, bubbleB.speedY, sin, cos, true)

      let vxTotal = velA.x - velB.x
      velA.x = velB.x
      velB.x = vxTotal + velA.x

      let absV = Math.abs(velA.x) + Math.abs(velB.x)
      let overlap = DFT_WIDTH - Math.abs(posA.x - posB.x)

      if (absV * overlap != 0) {
        posA.x += velA.x / absV * overlap
        posB.x += velB.x / absV * overlap

        let posAF = this.rotate(posA.x, posA.y, sin, cos, false)
        let posBF = this.rotate(posB.x, posB.y, sin, cos, false)

        bubbleB.setX(bubbleA.x + posBF.x)
        bubbleB.setY(bubbleA.y + posBF.y)
        bubbleA.setX(bubbleA.x + posAF.x)
        bubbleA.setY(bubbleA.y + posAF.y)

        let velAF = this.rotate(velA.x, velA.y, sin, cos, false)
        let velBF = this.rotate(velB.x, velB.y, sin, cos, false)

        bubbleA.speedX = velAF.x
        bubbleA.speedY = velAF.y
        bubbleB.speedX = velBF.x
        bubbleB.speedY = velBF.y
      
      }
    }
  }

  rotate(x: number, y: number, sin: number, cos: number, reverse: boolean) {
    if (reverse) {
      return { x: x * cos + y * sin, y: y * cos - x * sin }
    } else {
      return { x: x * cos - y * sin, y: y * cos + x * sin }
    }
  }

  componentWillMount() {
    cancelAnimationFrame(requestAFrameId)
    let $container = this.refs.bubblesContainerRef as HTMLElement
    // $container.removeEventListener('click', () => {})
  }

  render() {
    return (
      <div className="bubbles" 
        ref="bubblesContainerRef">
      </div>
    )
  }
}
