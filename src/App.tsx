import './App.scss'
import * as React from 'react'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Meteors from './components/Meteors'
import Brand from './components/Brand'
import Footer from './components/Footer'

export interface IProps {}
export interface IState {}

export default class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div className="app">
        <div className="main">
          <Meteors />
          <Brand />
        </div>
        <Footer />
      </div>
    )
  }
}