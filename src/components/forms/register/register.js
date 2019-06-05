import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import "../forms.css";
import { withRouter } from "react-router";
import LoginSystem from "../../utils";

class Register extends Component {
  state = {
    registerError: "",
    presesd: false
  };

  validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    retypePassword: Yup.string().required("Required")
  });

  render() {
    return (
      <div>
        <Formik
          initialValues={{ username: "", password: "", retypePassword: "" }}
          onSubmit={form => {
            this.registerAndToLoginPage(form);
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
                <label htmlFor="retypePassword">Retype Password</label>
                <input
                  name="retypePassword"
                  type="password"
                  value={values.retypePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.retypePassword && touched.retypePassword && "error"
                  }
                  id="retypePassword"
                />
                {errors.retypePassword && touched.retypePassword && (
                  <div className="input-feedback">{errors.retypePassword}</div>
                )}
                <button
                  type="submit"
                  className="submitButton"
                  disabled={this.pressed}
                >
                  Submit
                </button>
                {this.state.pressed && <p>Registering...</p>}
                {/* must find way to disable submit if pw not same */}
                {this.state.registerError && (
                  <p className="form-erorr">{this.state.registerError}</p>
                )}
                {values.password !== values.retypePassword &&
                  touched.retypePassword &&
                  touched.password && (
                    <p className="form-erorr">Passwords are different</p>
                  )}
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }

  registerAndToLoginPage(form) {
    if (form.password !== form.retypePassword) {
      return;
    }
    this.setState({ pressed: true });
    this.setState({ registerError: "" });
    LoginSystem.register(
      form.username,
      form.password,
      form.retypePassword
    ).then(data => {
      if (data.status === "success") {
        this.props.history.push("/login");
      } else {
        this.setState({ registerError: data.error });
        this.setState({ pressed: false });
      }
    });
  }
}

export default withRouter(Register);
