export function redirectToAuth() {
  fetch(`/users/login`, { credentials: "include", mode: "cors" })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = data.url;
      console.log(data);
    });
}
