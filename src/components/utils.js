import jwt_decode from "jwt-decode";

import { localStorageName } from "../config";
import { backendUrl } from "../config";

export default class LoginSystem {
  static checkLoggedIn() {
    // 1. check if logged in
    // 2. if not logged in, return false
    // 3. if logged in, check if expired
    // 4. if expired, log out, then return false
    // 4. else, return true
    const token = localStorage.getItem(localStorageName);
    if (!token) {
      return false;
    }
    if (LoginSystem.checkExpired()) {
      LoginSystem.logOut();
      return false;
    } else {
      return true;
    }
  }

  static checkExpired() {
    const token = localStorage.getItem(localStorageName);
    var decoded = jwt_decode(token);
    const unixSecond = Date.now() / 1000;
    if (unixSecond > decoded.exp) {
      return true;
    } else {
      return false;
    }
  }

  static getUserToken() {
    return localStorage.getItem(localStorageName);
  }

  static getToken(username, password) {
    const userDetails = {
      username: username,
      password: password
    };
    return fetch(backendUrl + "api/login", {
      method: "POST",
      body: JSON.stringify(userDetails)
    })
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }

  static logIn(token) {
    localStorage.setItem(localStorageName, token);
  }

  static logOut() {
    localStorage.removeItem(localStorageName);
  }

  static register(username, password, retypePassword) {
    const userDetails = {
      username: username,
      password: password,
      retype_password: retypePassword
    };
    return fetch(backendUrl + "api/register", {
      method: "POST",
      body: JSON.stringify(userDetails)
    })
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }
}
