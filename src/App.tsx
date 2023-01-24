import "./App.css";
import { redirectToAuth } from "./buttonActions";

//App
function App() {
  return (
    <div>
      <p>caita</p>

      <button onClick={redirectToAuth}>login</button>
    </div>
  );
}

export default App;
