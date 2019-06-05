import React, { Component } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import * as Yup from "yup";

import "../forms.css";
import LoginSystem from "../../utils";

class Login extends Component {
  state = {
    loginError: false,
    pressed: false
  };

  validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required")
  });

  render() {
    return (
      <div>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={form => {
            this.logInAndRefresh(form);
          }}
          validationSchema={this.validationSchema}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.username && touched.username && "error"}
                  id="username"
                />
                {errors.username && touched.username && (
                  <div className="input-feedback">{errors.username}</div>
                )}
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password && "error"}
                  id="password"
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
                <button
                  type="submit"
                  className="form-button"
                  disabled={this.pressed}
                >
                  Login
                </button>
                {this.state.pressed && <span>Logging in...</span>}
                {this.state.loginError && (
                  <span className="form-error">
                    Wrong username or password
                  </span>
                )}
              </form>
            );
          }}
        </Formik>
        <p className="register-text">
          {" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    );
  }

  toRegisterPage = () => {
    this.props.history.push("/register");
  };

  logInAndRefresh(form) {  //pull this out as 1 file, then should be able to mock
    this.setState({ pressed: true });
    this.setState({ loginError: false });
    LoginSystem.getToken(form.username, form.password).then(data => {
      if (data.status === "success") {
        LoginSystem.logIn(data.token);  
        this.props.history.push("/");
      } else {
        this.setState({ loginError: true });
        this.setState({ pressed: false });
      }
    });
  }
}

export default withRouter(Login);
