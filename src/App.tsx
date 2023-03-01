import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GetState } from "./GetState";
import { Login } from "./Login";
import { MyPage } from "./MyPage";
import { CreatorPage } from "./CreatorPage";
import { ImagePage } from "./ImagePage";

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
      path: "/MyPage",
      element: <MyPage />,
    },
    {
      path: "/images/:imageID",
      element: <ImagePage />,
    },
    {
      path: "/:creatorID",
      element: <CreatorPage />,
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
