export function redirectToAuth() {
  fetch(`/users/login`)
    .then((response) => response.json())
    .then((data) => {
      window.location.href = data.url;
      console.log(data);
    });
}
