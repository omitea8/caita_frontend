import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorPage } from "./ErrorPage";
import { About } from "./About";
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
    <div>
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <MenuBar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "calc(100vh - 100px)",
            padding: "10px 20px",
            flexGrow: 1,
          }}
        >
          <RouterProvider router={router} />
        </Box>
        <Footer />
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
