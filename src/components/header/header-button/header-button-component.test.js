import React from "react";
import HeaderButton from "./header-button-component";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import LocalStorageMock from "../../../localStorageMocker";
import { localStorageName } from "../../../config";

global.localStorage = new LocalStorageMock();

function setup() {
  const wrapper = mount(
    <BrowserRouter>
      <HeaderButton name="Logout" link="/login" class="top-right" id="logout" />
    </BrowserRouter>
  );
  return wrapper;
}

describe("<HeaderButton/>", () => {
  it("renders button", () => {
    const wrapper = setup();
    expect(wrapper.text().includes("Logout")).toBe(true);
  });

  it("logs out when clicked", () => {
    localStorage.setItem(localStorageName, "testing");
    const wrapper = setup();
    const btn = wrapper.find(".top-right");
    expect(btn.length).toEqual(1);
    btn.props().onClick();
    expect(localStorage.getItem(localStorageName)).toEqual(null);
  });
});
