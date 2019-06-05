import { Formik } from "formik";
import React, { Component } from "react";
import { withRouter } from "react-router";
import * as utils from "./upload.utils";

import "../forms.css";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }
  state = {
    uploadError: "",
    presesd: false,
    file: null
  };

  uploadAndToHome(form, fileInput) {
    if (!fileInput){
      this.setState({uploadError: "No image is selected"});
      return
    }
    if (
      utils.checkOverSize(fileInput.size) ||
      !utils.checkCorrectFileExtension(fileInput.name)
    ) {
      return;
    }
    this.setState({ pressed: true });
    this.setState({ uploadError: "" });
    utils
      .uploadToServer(fileInput, form.description)
      .then(response => {
        if (response.status === "success") {
          this.props.history.push("/");
        } else {
          this.setState({ uploadError: response.error });
          this.setState({ pressed: false });
        }
      });
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{ description: "" }}
          onSubmit={form => {
            this.uploadAndToHome(form, this.fileInput.current.files[0]);
          }}
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
                <input type="file" ref={this.fileInput} onBlur={handleBlur} id="fileInput"/>

                <label htmlFor="description">Description</label>
                <input
                  name="description"
                  type="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.description && touched.description && "error"
                  }
                />
                <button
                  type="submit"
                  className="submitButton"
                  disabled={this.pressed}
                >
                  Submit
                </button>
                {this.state.pressed && <p>Uploading...</p>}

                {this.state.uploadError && (
                  <p className="form-erorr">{this.state.uploadError}</p>
                )}
                {this.fileInput.current &&
                  utils.checkOverSize(this.fileInput) && (
                    <p className="form-erorr">File limit is 2mb</p>
                  )}

                {this.fileInput.current &&
                  this.fileInput.current.files &&
                  this.fileInput.current.files[0] &&
                  !utils.checkCorrectFileExtension(
                    this.fileInput.current.files[0].name
                  ) && (
                    <p className="form-erorr">File extension not supported</p>
                  )}
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default withRouter(Upload);
