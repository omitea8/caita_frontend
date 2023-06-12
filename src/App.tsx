import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorPage } from "./pages/ErrorPage";
import { About } from "./pages/AboutPage";
import { GetState } from "./pages/GetState";
import { Login } from "./pages/Login";
import { CustomPage } from "./pages/CustomPage";
import { PostPage } from "./pages/PostPage";
import { CreatorPage } from "./pages/CreatorPage";
import { ImagePage } from "./pages/ImagePage";
import { EditPage } from "./pages/EditPage";

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
      path: "/edit/:imageId",
      element: <EditPage />,
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
