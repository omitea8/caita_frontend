import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorPage } from "./ErrorPage";
import { About } from "./AboutPage";
import { GetState } from "./GetState";
import { Login } from "./Login";
import { CustomPage } from "./CustomPage";
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
      path: "/about",
      element: <About />,
    },
    {
      path: "/auth/twitter/callback",
      element: <GetState />,
    },
    {
      path: "/custom",
      element: <CustomPage />,
    },
    {
      path: "/post",
      element: <PostPage />,
    },
    {
      path: "/images/:imageId",
      element: <ImagePage />,
    },
    {
      path: "/creator/:creatorId",
      element: <CreatorPage />,
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
