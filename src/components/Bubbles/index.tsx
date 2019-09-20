import "./index.scss";
import * as React from "react";

export interface IProps {}
export interface IState {}

export default class Bubbles extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let style = {
      height: "70px",
      width: "70px"
    }
    
    return (
      <div className="bubbles">
        <span className="bubble ball effect" style={style}>物理</span>
        <span className="bubble ball effect" style={style}>数学</span>
        <span className="bubble ball effect" style={style}>意识</span>
      </div>
    );
  }
}
