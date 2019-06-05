import LoginSystem from "./utils";
import LocalStorageMock from "../localStorageMocker";
import { localStorageName } from "../config";
import { backendUrl } from "../config";

global.localStorage = new LocalStorageMock();

describe("LoginSystem.checkLoggedIn", () => {
  it("checks if not logged in", () => {
    expect(LoginSystem.checkLoggedIn()).toEqual(false);
  });

  it("checks if logged in but expired, then needs to be logged out", () => {
    LoginSystem.logIn(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOi0yNzYwMjYyNjcyLCJpYXQiOjE1NTk3MzczMjgsIm5hbWUiOiJ0ZXN0aW5nIiwic3ViIjoxfQ.-ik44NR4ENbEr7TmwpTCm0eNK30nvnXIpJxH9bnkFxA"
    );
    expect(LoginSystem.checkLoggedIn()).toEqual(false);
    expect(localStorage.getItem(localStorageName)).toEqual(null);
  });

  it("checks if logged in and not expired", () => {
    LoginSystem.logIn(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjU4Nzk3MzcxNzksImlhdCI6MTU1OTczNzE3OSwibmFtZSI6InRlc3RpbmciLCJzdWIiOjF9.OAlpks-XhEMHpf5sJ1f_idlpyTud_9KrupHCKrjmffI"
    );
    expect(LoginSystem.checkLoggedIn()).toEqual(true);
  });
});

it("checks if logged in with correct token", () => {
  LoginSystem.logIn("testing");
  expect(localStorage.getItem(localStorageName)).toEqual("testing");
});

it("checks if logged out correctly", () => {
  LoginSystem.logIn("testing");
  LoginSystem.logOut();
  expect(localStorage.getItem(localStorageName)).toEqual(null);
});

it("checks getUserToken", () => {
  LoginSystem.logIn("testing");
  expect(LoginSystem.getUserToken()).toEqual("testing");
});

describe("getToken", () => {
  it("sends out correct getToken post request", done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    LoginSystem.getToken("testing", "testing");

    expect(global.fetch).toHaveBeenCalledWith(backendUrl + "/api/login", {
      method: "POST",
      body: JSON.stringify({ username: "testing", password: "testing" })
    });
    // global.fetch.mockClear(); // 7
    done(); // 8
  });
});

describe("register", () => {
  it("sends out correct register post request", done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    LoginSystem.register("testing", "testing", "testing");

    expect(global.fetch).toHaveBeenCalledWith(backendUrl + "/api/register", {
      method: "POST",
      body: JSON.stringify({
        username: "testing",
        password: "testing",
        retype_password: "testing"
      })
    });
    done();
  });
});
