import React, { Component } from "react";
import "./igpost.css";
import { backendUrl } from "../../../config";

class IgPost extends Component {
  render() {
    const img_path = this.props.img_path; // props cant work with require
    let date = this.props.update_date.substring(0, 16);
    date = date.replace("T", " ");
    return (
      <div className="post">
        <div className="card-body">
          <div className="post-username">{this.props.author}</div>
          <img
            src={backendUrl + img_path}
            alt={img_path}
            className="post-image"
          />
          <div className="post-description">{this.props.description}</div>
          <div className="post-updateDate">{date}</div>
        </div>
      </div>
    );
  }
}

export default IgPost;
