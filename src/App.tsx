import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorPage } from "./error-page";
import { GetState } from "./GetState";
import { Login } from "./Login";
import { MyPage } from "./CustomPage";
import { PostPage } from "./PostPage";
import { CreatorPage } from "./CreatorPage";
import { ImagePage } from "./ImagePage";

//App
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
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
      path: "/PostPage",
      element: <PostPage />,
    },
    {
      path: "/images/:imageID",
      element: <ImagePage />,
    },
    {
      path: "/creator/:creatorID",
      element: <CreatorPage />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
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
