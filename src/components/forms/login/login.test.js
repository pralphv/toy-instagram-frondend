import React from "react";
import Login from "./login";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

function setup() {
  const wrapper = mount(
    <BrowserRouter>
      <Login.WrappedComponent />
    </BrowserRouter>
  );
  return wrapper;
}

describe("<Login />", () => {
  it("renders page properly", () => {
    const wrapper = setup();
    expect(wrapper.text().includes("Username")).toBe(true);
    expect(wrapper.text().includes("Password")).toBe(true);
    expect(wrapper.text().includes("Register")).toBe(true);
    expect(wrapper.text().includes("Login")).toBe(true);
  });

  // it("logInAndRefresh is called when submit", done => {
  //   const mockSuccessResponse = {};
  //   const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  //   const mockFetchPromise = Promise.resolve({
  //     json: () => mockJsonPromise
  //   });
  //   // components with withRouter could not be spied on.
  //   // dont know how to test, but this works when
  //   // withRouter is deleted
  //   jest
  //     .spyOn(Login.prototype, "logInAndRefresh")
  //     .mockImplementation(() => mockFetchPromise);
  //   const wrapper = setup();
  //   const username = wrapper.find("#username");
  //   const password = wrapper.find("#password");
  //   username.instance().value = "testing";
  //   username.simulate("change");
  //   password.instance().value = "testing";
  //   password.simulate("change");
  //   wrapper.find("form").simulate("submit");
  //   window.setTimeout(() => {
  //     expect(Login.prototype.logInAndRefresh).toHaveBeenCalled();
  //     expect(Login.prototype.logInAndRefresh).toHaveBeenCalledWith(
  //       "testing",
  //       "testing"
  //     );
  //     done();
  //   }, 0);
  // });

  it("'Required' is rendered when empty submit", done => {
    const wrapper = setup();
    wrapper.find("form").simulate("submit");
    window.setTimeout(() => {
      expect(wrapper.text().includes("Required")).toBe(true);
      done();
    }, 0);
  });

  it("'Logging in' is rendered when submitted", done => {
    const wrapper = setup();
    const username = wrapper.find("#username");
    const password = wrapper.find("#password");
    username.instance().value = "testing";
    username.simulate("change");
    password.instance().value = "testing";
    password.simulate("change");
    wrapper.find("form").simulate("submit");
    window.setTimeout(() => {
      expect(wrapper.text().includes("Logging in")).toBe(true);
      done();
    }, 0);
  });

  // it("'Wrong username or password' is rendered when api returns fail", () => {
  // const wrapper = setup();
  // wrapper.setState({ loginError: true });
  // const form = wrapper.find("form");
  // form.simulate("change");
  // expect(wrapper.text().includes("Wrong username or password")).toBe(true);
  // });
});
