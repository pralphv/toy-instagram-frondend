import React from "react";
import Searchbar from "./searchbar-component";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

function getValueFromSearchbar(searchbarValue) {
  this.setState({ searchbarValue: searchbarValue });
}

function setup() {
  const wrapper = mount(
    <BrowserRouter>
      <Searchbar childToParent={getValueFromSearchbar} />
    </BrowserRouter>
  );
  return wrapper;
}

describe("<HeaderButton/>", () => {
  it("renders search bar", () => {
    const wrapper = setup();
    expect(wrapper.find(".searchbar").length).toEqual(1);
  });
});
