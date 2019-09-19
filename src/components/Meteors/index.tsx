import './index.scss'
import * as React from 'react'

export interface IProps {}
export interface IState {}

export default class Meteors extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div className="meteors"></div>
    )
  }
}