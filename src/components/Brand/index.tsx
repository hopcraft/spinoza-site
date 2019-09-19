import './index.scss'
import * as React from 'react'

export interface IProps {}
export interface IState {}

export default class Brand extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <article>
        <h1 className="brand effect">HOPCRAFT/IO</h1>
      </article>
    )
  }
}