import * as utils from "./igposts.utils";

const posts = [
  {
    author: "a",
    description: "testing",
    update_date: "2019-01-01T00:00:0000000000000000000",
    img_path: "test.jpg",
    key: "1"
  },
  {
    author: "b",
    description: "testing",
    update_date: "2019-01-01T00:00:0000000000000000000",
    img_path: "test.jpg",
    key: "2"
  },
  {
    author: "ab",
    description: "testing",
    update_date: "2019-01-01T00:00:0000000000000000000",
    img_path: "test.jpg",
    key: "3"
  }
];

describe("renderMultiplePosts", () => {
  it("Return all", () => {
    const result = utils.renderMultiplePosts(posts, "");
    expect(result.length).toEqual(3);
  });

    it("Return filtered correctly", () => {
      const result = utils.renderMultiplePosts(posts, "a");
      expect(result.length).toEqual(2);
    });

});

// it("sends out correct register post request", done => {
//   const mockSuccessResponse = {};
//   const mockJsonPromise = Promise.resolve(mockSuccessResponse);
//   const mockFetchPromise = Promise.resolve({
//     json: () => mockJsonPromise
//   });
//   jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
//   utils.getPosts();
//   expect(global.fetch).toHaveBeenCalledWith("http://127.0.0.1:5000/api/igpost");
//   done();
// });
