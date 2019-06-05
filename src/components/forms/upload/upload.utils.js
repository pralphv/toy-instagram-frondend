import LoginSystem from "../../utils";
import { backendUrl } from "../../../config";

export function checkOverSize(fileSize) {
  try {
    return fileSize > 2 * 1024 * 1024;
  } catch {
    return false;
  }
}

export function checkCorrectFileExtension(fileName) {
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const splitted = fileName.split(".");
  const fileExtension = splitted[splitted.length - 1];
  if (allowedExtensions.includes(fileExtension)) {
    return true;
  } else {
    return false;
  }
}

export function uploadToServer(file, description) {
  let body = new FormData();
  body.append("file", file);
  body.append("description", description);
  // const proxyurl = "https://cors-anywhere.herokuapp.com/";
  return fetch(backendUrl + "api/igpost", {
    method: "POST",
    headers: new Headers({
      Authorization: LoginSystem.getUserToken()
    }),
    body: body,
  })
    .then(res => res.json())
    .then(data => {
      return data;
    });
}
