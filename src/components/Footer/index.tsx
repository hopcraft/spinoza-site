import './index.scss'
import * as React from 'react'

export interface IProps {}
export interface IState {}

export default class Footer extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <footer><p className="slogan">精骛八极，心游万仞</p></footer>
    )
  }
}