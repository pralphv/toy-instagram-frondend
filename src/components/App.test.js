import React from "react";
import App from "./App";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";


describe("<App/>", () => {
  it("renders page", () => {
    const wrapper = mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    wrapper.find(".top-right");
    expect(wrapper.find(".top-right").length).toEqual(1);
    expect(wrapper.find(".searchbar").length).toEqual(1);
  });
});
