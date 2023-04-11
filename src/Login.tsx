interface AuthResponse {
  url: string;
}

export const Login = () => {
  function redirectToAuth() {
    fetch(`/creators/login`)
      .then((response) => response.json() as Promise<AuthResponse>)
      .then((data) => {
        window.location.href = data.url;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div>
      <p>caita</p>
      <button onClick={redirectToAuth}>login</button>
    </div>
  );
};
