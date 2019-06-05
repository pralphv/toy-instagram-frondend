import React, { Component } from "react";
import "./searchbar.css";

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.searchbarChange = this.searchbarChange.bind(this);
  }

  searchbarChange(e) {
    this.props.childToParent(e.target.value);
  }
  
  render() {
    return (
      <div className="searchbar">
        <input type="text" onChange={this.searchbarChange} placeholder="Filter by User" id="searchbar"/>
      </div>
    );
  }
}

export default Searchbar;
