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
    };

    return (
      <div className="bubbles">
        <div className="bubbles-content">
          <span className="bubble-wrapper">
            <span className="bubble ball effect" style={style}>
              物理
            </span>
          </span>
          <span className="bubble-wrapper">
            <span className="bubble ball effect" style={style}>
              数学
            </span>
          </span>
          <span className="bubble-wrapper">
            <span className="bubble ball effect" style={style}>
              计算
            </span>
          </span>
          <span className="bubble-wrapper">
            <span className="bubble ball effect" style={style}>
              哲学
            </span>
          </span>
        </div>
      </div>
    );
  }
}
