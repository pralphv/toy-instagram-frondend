import React, { Component } from "react";

import IgPosts from "./body/igposts/igposts-component";
import Header from "./header/header";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <IgPosts />
      </div>
    );
  }
}

export default App;
