export const Login = () => {
  function redirectToAuth() {
    fetch(`/creator/login`)
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
