export const Login = () => {
  function redirectToAuth() {
    fetch(`/users/login`)
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.url;
      });
  }
  return (
    <div>
      <p>caita</p>
      <button onClick={redirectToAuth}>login</button>
    </div>
  );
};
