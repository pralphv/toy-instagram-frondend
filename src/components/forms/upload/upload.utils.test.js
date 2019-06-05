import * as utils from "./upload.utils";
import LoginSystem from "../../utils";
import { backendUrl } from "../../../config";

class MockFiles {
  constructor(name, size) {
    this.name = name;
    this.current = { files: [{ size: size * 1024 * 1024 }] };
  }
}

describe("checkOverSize", () => {
  it("Return true if file oversized", () => {
    var size = 2.1 * 1024 * 1024;
    const result = utils.checkOverSize(size);
    expect(result).toBe(true);
  });

  it("Return false if file correct size", () => {
    var size = 1.9 * 1024 * 1024;
    const result = utils.checkOverSize(size);
    expect(result).toBe(false);
  });
});

describe("checkCorrectFileExtension", () => {
  it("Return true if jpg", () => {
    const result = utils.checkCorrectFileExtension("pic.jpg");
    expect(result).toBe(true);
  });

  it("Return true if jpeg", () => {
    const result = utils.checkCorrectFileExtension("pic.jpeg");
    expect(result).toBe(true);
  });

  it("Return true if png", () => {
    const result = utils.checkCorrectFileExtension("pic.png");
    expect(result).toBe(true);
  });

  it("Return false if wrong file", () => {
    const result = utils.checkCorrectFileExtension("pic.txt");
    expect(result).toBe(false);
  });
});

it("sends out correct register post request", done => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
  const fileSize = 2;
  const file = new MockFiles("testing.jpg", fileSize);
  const description = "testing";
  let body = new FormData();
  body.append("file", file);
  body.append("description", description);
  utils.uploadToServer(file, description);
  expect(global.fetch).toHaveBeenCalledWith(backendUrl + "api/igpost", {
    method: "POST",
    headers: new Headers({
      Authorization: LoginSystem.getUserToken()
    }),
    body: body
  });
  done();
});
