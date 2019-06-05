import React from "react";
import Upload from "./upload";
import { mount, shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

// copied from https://gist.github.com/josephhanson/372b44f93472f9c5a2d025d40e7bb4cc
function MockFile() { };
MockFile.prototype.create = function (name, size, mimeType) {
  name = name || "mock.jpg";
  size = size || 1024;
  mimeType = mimeType || 'image/jpeg"';

  function range(count) {
      var output = "";
      for (var i = 0; i < count; i++) {
          output += "a";
      }
      return output;
  }

  var blob = new Blob([range(size)], { type: mimeType });
  blob.lastModifiedDate = new Date();
  blob.name = name;

  return blob;
};


function setup() {
  const wrapper = mount(
    <BrowserRouter>
      <Upload.WrappedComponent />
    </BrowserRouter>
  );
  return wrapper;
}

describe("<Upload />", () => {
  it("renders page properly", () => {
    const wrapper = setup();
    expect(wrapper.text().includes("Description")).toBe(true);
    expect(wrapper.text().includes("Submit")).toBe(true);
  });

  it("'No image is selected' is rendered when state is pressed with no image", done => {
    const wrapper = setup();
    wrapper.find("form").simulate("submit");
    window.setTimeout(() => {
      expect(wrapper.text().includes("No image is selected")).toBe(true);
      done();
    }, 0);
  });


  // it("File upload", done => {
  //   const wrapper = setup();
  //   var size = 1024 * 1024 * 2.1;
  //   var mock = new MockFile();
  //   var file = mock.create("pic.jpg", size, "image/jpeg");
  //   file = new Blob(['testing'], {type : 'text/plain'});
  //   wrapper.find('#fileInput').simulate('change', {target: {files: ["12312321", file]}});
  //   wrapper.find("form").simulate("submit");

  //   window.setTimeout(() => {
  //     expect(wrapper.text().includes("Uploading")).toBe(true);
  //     done();
  //   }, 0);
  // });




});
