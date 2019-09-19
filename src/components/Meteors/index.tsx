import './index.scss'
import * as React from 'react'
import Meteor from './Meteor'
import { requestAnimationFrame } from '../../utils'

export interface IProps {}
export interface IState {}

const meteors: any[] = []

export default class Meteors extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  init() {
    let container: HTMLElement = document.querySelector('.meteors') as HTMLElement
    let smallWidth: boolean = window.screen.availWidth <= 812
    let total: number = smallWidth ? 15 : 25
    let factor: number = smallWidth ? 0.8 : 1

    for (let i = total; i--;) { 
      let meteor = new Meteor(factor) 
      meteors.push(meteor)
      container.appendChild(meteor.element)
    }

    this.update()
  }

  update() {
    for (let i = meteors.length; i--;) { 
      meteors[i].move()
    }
    requestAnimationFrame(this.update)
  }

  render() {
    return (
      <div className="meteors"></div>
    )
  }
}