import LocalStorageMock from "./localStorageMocker.js";

let mockStorage = new LocalStorageMock();

describe("LoginSystem.checkLoggedIn", () => {
  it("checks set item and get item", () => {
    mockStorage.setItem("testing", "testing");
    expect(mockStorage.getItem("testing")).toEqual("testing");
  });

  it("checks remove item ", () => {
    mockStorage.setItem("testing", "testing");
    mockStorage.removeItem("testing");
    expect(mockStorage.getItem("testing")).toEqual(null);
  });
});
