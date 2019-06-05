import React from "react";
import { withRouter } from "react-router-dom";

import "./header.css";
import LoginSystem from "../utils";
import HeaderButton from "./header-button/header-button-component";

class Header extends React.Component {
  state = {
    isLoggedIn: LoginSystem.checkLoggedIn()
  };

  render() {
    return (
      <nav className="nav">
        <div className="mav-menus">
          <a href="/">
            <img src={require("./icon.png")} className="nav-icon" alt="icon" />
          </a>

          {this.state.isLoggedIn ? (
            <div>
              <HeaderButton name="Logout" link="/login" class="top-right" id="logout" />
              <HeaderButton
                name="Upload"
                link="/upload"
                class="top-right top-right2"
                id="upload"
              />
            </div>
          ) : (
            <HeaderButton name="Login" link="/login" class="top-right" id="login" />
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
