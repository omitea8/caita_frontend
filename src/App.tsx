import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { redirectToAuth } from "./buttonActions";
import { GetState } from "./GetState";

//App
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <p>caita</p>
          <button onClick={redirectToAuth}>login</button>
        </div>
      ),
    },
    {
      path: "/auth/twitter/callback",
      element: <GetState />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
