import { isRedirect } from "node-fetch";

export function loginButton() {
  console.log("Button clicked!");
  fetch(`/users/login`)
    .then((response) => response.json())
    .then((data) => {
      window.location.href = data.url;
      console.log(data);
    });
}
