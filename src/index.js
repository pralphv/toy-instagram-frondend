import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";

import "./index.css";
import App from "./components/App";
import Login from "./components/forms/login/login";
import Register from "./components/forms/register/register";
import Upload from "./components/forms/upload/upload";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
