// src/components/Header/index.js
import React from "react";
import { withRouter } from "react-router-dom";

import LoginSystem from "../../utils";
import "./header-button.css";


class HeaderButton extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    if (this.props.name === "Logout") {
      LoginSystem.logOut();
    }
    this.props.history.push(this.props.link);
  }

  render() {
    return (
      <button className={this.props.class} onClick={this.clicked} id={this.id}>
        {this.props.name}
      </button>
    );
  }
}


export default withRouter(HeaderButton);
