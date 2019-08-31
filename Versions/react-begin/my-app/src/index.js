import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      total: null,
      next: null,
      operation: null
    };
  }

  handleClick(value) {
    let prevValue = this.state.total;
    this.setState({
      total: (prevValue += value).toString()
    });
  }

  render() {
    let numsButtons = [];
    for (var i = 0; i < 10; i++) {
      numsButtons.push(
        <Button num={i} key={i} handleClick={this.handleClick} />
      );
    }

    return (
      <div className="calc">
        <div className="calc__main">{this.state.total}</div>
        <div className="calc__panel">
          {numsButtons}

            <Button num="." key="." handleClick={this.handleClick} />
          <button className="calc__button calc__button_sign">+</button>
          <button className="calc__button calc__button_sign">-</button>
          <button className="calc__button calc__button_sign">×</button>
          <button className="calc__button calc__button_sign">÷</button>
          <button className="calc__button calc__button_sign">=</button>
        </div>
      </div>
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.handleClick(this.props.num);
  }
  render() {
    return (
      <button
        className="calc__button"
        value={this.props.value}
        onClick={this.handleClick}
      >
        {this.props.num}
      </button>
    );
  }
}
ReactDOM.render(<Calc />, document.getElementById("root"));

serviceWorker.unregister();
