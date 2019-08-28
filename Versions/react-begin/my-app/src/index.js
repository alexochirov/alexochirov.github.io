import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import * as serviceWorker from "./serviceWorker";

class Calc extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null
  };
  handleClick(){
    
    this.setState({
      total: 2
    });
    console.log(this.state.buttonInfo);
  };

  render() {
    let numsButtons = [];
    for (var i = 0; i < 10; i++) {
      numsButtons.push(
        <Button num={i} key={i} handleClick={this.handleClick()} />
      );
    }

    return (
      <div className="calc">
        <div className="calc__main" />
        <div className="calc__panel">
          {numsButtons}
          <button className="calc__button">.</button>
          <button className="calc__button calc__button_sign">+</button>
          <button className="calc__button calc__button_sign">-</button>
          <button className="calc__button calc__button_sign">×</button>
          <button className="calc__button calc__button_sign">÷</button>
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
    this.props.handleClick();
  }
  render() {
    return (
      <button className="calc__button" onClick={this.props.handleClick}>
        {this.props.num}
      </button>
    );
  }
}
ReactDOM.render(<Calc />, document.getElementById("root"));

serviceWorker.unregister();
