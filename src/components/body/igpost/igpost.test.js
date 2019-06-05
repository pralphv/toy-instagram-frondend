import React from "react";
import IgPost from "./igpost";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import { backendUrl } from "../../../config";

function setup() {
  const wrapper = mount(
    <BrowserRouter>
      <IgPost
        author="testing"
        description="testing2"
        update_date="2019-01-01T00:00:0000000000000000000"
        img_path="test.jpg"
        key="1"
      />
    </BrowserRouter>
  );
  return wrapper;
}

describe("<Header/>", () => {
  it("renders post", () => {
    const wrapper = setup();
    expect(wrapper.find("img").prop("src")).toEqual(backendUrl + "test.jpg");
    expect(wrapper.find(".post-username").text()).toEqual("testing");
    expect(wrapper.find(".post-description").text()).toEqual("testing2");
  });

  it("correct date format", () => {
    const wrapper = setup();
    expect(wrapper.find(".post-updateDate").text()).toEqual("2019-01-01 00:00");
  });
});
