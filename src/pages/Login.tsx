export const Login = () => {
  function redirectToAuth() {
    fetch(`${process.env.REACT_APP_API_URL ?? ""}/creators/login`)
      .then((response) => response.json() as Promise<{ url: string }>)
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
