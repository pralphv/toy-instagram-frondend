import React from "react";
import Header from "./header";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { LocalStorageMock } from "../../localStorageMocker";
import { localStorageName } from "../../config";

global.localStorage = new LocalStorageMock();

function setup() {
  const wrapper = mount(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  return wrapper;
}

describe("<Header/>", () => {
  it("renders icon", () => {
    const wrapper = setup();
    expect(wrapper.find("img").prop("src")).toEqual("icon.png");
  });

  it("renders login when not logged in", () => {
    const wrapper = setup();
    expect(wrapper.text().includes("Login")).toBe(true);
    expect(wrapper.text().includes("Logout")).toBe(false);
  });

  it("renders logout and upload when logged in", () => {
    const notExpiredToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjU4Nzk3MzcxNzksImlhdCI6MTU1OTczNzE3OSwibmFtZSI6InRlc3RpbmciLCJzdWIiOjF9.OAlpks-XhEMHpf5sJ1f_idlpyTud_9KrupHCKrjmffI";
    localStorage.setItem(localStorageName, notExpiredToken);
    const wrapper = setup();
    expect(wrapper.text().includes("Logout")).toBe(true);
    expect(wrapper.text().includes("Upload")).toBe(true);
  });
});
