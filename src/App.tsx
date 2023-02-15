import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GetState } from "./GetState";
import { Login } from "./Login";
import { Mypage } from "./Mypage";

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
    {
      path: "/mypage",
      element: <Mypage />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
