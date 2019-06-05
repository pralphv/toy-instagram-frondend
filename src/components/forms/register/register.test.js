import React from "react";
import Register from "./register";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

function setup() {
  const wrapper = mount(
    <BrowserRouter>
      <Register.WrappedComponent />
    </BrowserRouter>
  );
  return wrapper;
}
describe("<Register />", () => {
  it("renders page properly", () => {
    const wrapper = setup();
    expect(wrapper.text().includes("Username")).toBe(true);
    expect(wrapper.text().includes("Password")).toBe(true);
    expect(wrapper.text().includes("Retype Password")).toBe(true);
    expect(wrapper.text().includes("Submit")).toBe(true);
  });

//   it("logInAndRefresh is called when submit", done => {
//     const mockSuccessResponse = {};
//     const mockJsonPromise = Promise.resolve(mockSuccessResponse);
//     const mockFetchPromise = Promise.resolve({
//       json: () => mockJsonPromise
//     });
//     // components with withRouter could not be spied on.
//     // dont know how to test, but this works when
//     // withRouter is deleted
//     jest
//       .spyOn(Login.prototype, "logInAndRefresh")
//       .mockImplementation(() => mockFetchPromise);
//     const wrapper = setup();
//     const username = wrapper.find("#username");
//     const password = wrapper.find("#password");
//     username.instance().value = "testing";
//     username.simulate("change");
//     password.instance().value = "testing";
//     password.simulate("change");
//     wrapper.find("form").simulate("submit");
//     window.setTimeout(() => {
//       expect(Login.prototype.logInAndRefresh).toHaveBeenCalled();
//       expect(Login.prototype.logInAndRefresh).toHaveBeenCalledWith(
//         "testing",
//         "testing"
//       );
//       done();
//     }, 0);
//   });

it("'Required' is rendered when empty submit", done => {
    const wrapper = setup();
    wrapper.find("form").simulate("submit");
    window.setTimeout(() => {
      expect(wrapper.text().includes("Required")).toBe(true);
      done();
    }, 0);
  });

  it("'Passwords are different' is rendered when different passwords", done => {
    const wrapper = setup();
    const retypePassword = wrapper.find("#retypePassword");
    const password = wrapper.find("#password");
    retypePassword.instance().value = "testing";
    retypePassword.simulate("change");
    password.instance().value = "testing1";
    password.simulate("change");
    wrapper.find("form").simulate("submit");
    window.setTimeout(() => {
      expect(wrapper.text().includes("Passwords are different")).toBe(true);
      done();
    }, 0);
  });

  it("'Registering' is rendered when state is pressed", done => {
    const wrapper = setup();
    const username = wrapper.find("#username");
    const retypePassword = wrapper.find("#retypePassword");
    const password = wrapper.find("#password");
    username.instance().value = "testing";
    username.simulate("change");
    retypePassword.instance().value = "testing";
    retypePassword.simulate("change");
    password.instance().value = "testing";
    password.simulate("change");
    wrapper.find("form").simulate("submit");
    window.setTimeout(() => {
        expect(wrapper.text().includes("Registering")).toBe(true);
        done();
      }, 0);
  
  });

});
