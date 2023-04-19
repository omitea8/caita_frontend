import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorPage } from "./error-page";
import { GetState } from "./GetState";
import { Login } from "./Login";
import { CustomPage } from "./CustomPage";
import { PostPage } from "./PostPage";
import { CreatorPage } from "./CreatorPage";
import { ImagePage } from "./ImagePage";
import { MenuBar } from "./MenuBar";
import { Footer } from "./Footer";
import { Box } from "@mui/material";

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
      path: "/CustomPage",
      element: <CustomPage />,
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
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <MenuBar />
        <Box sx={{ flexGrow: 1 }}>
          <RouterProvider router={router} />
        </Box>
        <Footer />
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
