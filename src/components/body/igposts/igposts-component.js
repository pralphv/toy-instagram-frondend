import React, { Component } from "react";
import Searchbar from "../searchbar/searchbar-component";
import * as utils from "./igposts.utils";
import { backendUrl } from "../../../config";

// export function getPosts() {
//   return fetch(backendUrl + "api/igpost")
//     .then(res => res.json())
//     .then(data => {
//       return data.data;
//     });
// }

class IgPosts extends Component {
  constructor(props) {
    super(props);
    this.getValueFromSearchbar = this.getValueFromSearchbar.bind(this);
  }

  state = {
    searchbarValue: "",
    listOfIgPosts: []
  };

  getPosts() {
    return fetch(backendUrl + "api/igpost")
      .then(res => res.json())
      .then(data => {
        return data.data;
      });
  }

  getValueFromSearchbar(searchbarValue) {
    this.setState({ searchbarValue: searchbarValue });
  }

  setStateHelper(listOfIgPostsInput) {
    if (this.state.listOfIgPosts.length !== listOfIgPostsInput.length) {
      // to prevent the page from continously refreshing
      // dont know why but this.state.listOfIgPosts is !== listOfIgPosts does not work
      // therefore use length instead
      this.setState({ listOfIgPosts: listOfIgPostsInput });
    }
  }

  render() {
    this.getPosts()
      .then(posts => {
        if (!posts) {
          return <Searchbar childToParent={this.getValueFromSearchbar} />;
        }
        const listOfIgPosts = utils.renderMultiplePosts(
          posts,
          this.state.searchbarValue
        );
        this.setStateHelper(listOfIgPosts);
      })
      .catch(error => this.setStateHelper("Server Error"));
    return (
      <div>
        <Searchbar childToParent={this.getValueFromSearchbar} />
        {this.state.listOfIgPosts}
      </div>
    );
  }
}

export default IgPosts;
