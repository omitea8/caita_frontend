import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GetState } from "./GetState";
import { Login } from "./Login";

//App
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
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
