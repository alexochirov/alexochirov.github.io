import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.handleNum = this.handleNum.bind(this);
    this.state = {
      operation: null,
      prev: 0,
      currView: 0,
      total: 0
    };
  }

  handleNum(value) {
    if (value === "+") {
      this.setState({
        operation: value,
        prev: parseFloat(this.state.currView),
        
      });
    } else if (value === "ac") {
      this.setState({
        operation: null,
        prev: 0,
        currView: 0
      });
    } else if (value === "=") {
    } else {
      let prevValue;
      if (this.state.operation === null) {
        prevValue = this.state.currView;
      } else {
        prevValue = this.state.total;
      }
      console.log(value);
      let input;
      let currValue;
      if (prevValue.toString().indexOf(".") === -1) {
        currValue = (prevValue + value).toString();
      } else {
        input = (prevValue + value).toString().split(".");
        currValue = input.shift() + "." + input.join("");
      }

      this.setState({
        currView: currValue
      });
    }
  }

  render() {
    let numsButtons = [];
    for (var i = 0; i < 10; i++) {
      numsButtons.push(<Button num={i} key={i} handleClick={this.handleNum} />);
    }
    console.log(this.state);
    return (
      <div className="calc">
        <div className="calc__main">{Number(this.state.currView)}</div>
        <div className="calc__panel">
          {numsButtons}

          <Button num="." handleClick={this.handleNum} />
          <Button num="+" isOperation={true} handleClick={this.handleNum} />
          <button className="calc__button calc__button_sign">+</button>
          <button className="calc__button calc__button_sign">-</button>
          <button className="calc__button calc__button_sign">×</button>
          <button className="calc__button calc__button_sign">÷</button>
          <Button num="=" isOperation={true} handleClick={this.handleNum} />
          <Button num="ac" isOperation={true} handleClick={this.handleNum} />
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
    const classes =
      this.props.isOperation === true
        ? "calc__button calc__button_sign"
        : "calc__button ";
    return (
      <button
        className={classes}
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
