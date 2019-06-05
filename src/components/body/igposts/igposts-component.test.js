import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import IgPosts from "./igposts-component";

function setup() {
  const wrapper = mount(
    <BrowserRouter>
      <IgPosts />
    </BrowserRouter>
  );
  return wrapper;
}

describe("igpost api is ran", () => {
  it("sends out correct getPosts post request", done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    setup();
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/api/igpost"
    );
    done();
  });
});

it("search bar rendered", done => {
  // const mockResponse = {
  //   status: "success",
  //   data: [
  //     {
  //       img_path: "static/img/28.jpg",
  //       description: "wev12e12ve21e21ve21ve12ve21ve",
  //       id: 34,
  //       update_date: "2019-06-04T21:44:20.703155+00:00",
  //       author: "meow"
  //     },
  //     {
  //       img_path: "static/img/27.jpg",
  //       description: "",
  //       id: 33,
  //       update_date: "2019-06-04T20:09:21.982848+00:00",
  //       author: "meow"
  //     }
  //   ]
  // };
  const wrapper = setup();
  const searchbar = wrapper.find("#searchbar").html();
  expect(JSON.stringify(searchbar).includes("Filter")).toBe(true);
  done();
});
