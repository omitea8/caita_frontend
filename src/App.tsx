import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorPage } from "./pages/ErrorPage";
import { About } from "./pages/AboutPage";
import { GetState } from "./pages/GetState";
import { CustomPage } from "./pages/CustomPage";
import { SettingsPage } from "./pages/SettingsPage";
import { PostPage } from "./pages/PostPage";
import { CreatorPage } from "./pages/CreatorPage";
import { ImagePage } from "./pages/ImagePage";
import { EditPage } from "./pages/EditPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

const queryClient = new QueryClient();

// App
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <About />,
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
      path: "/settings",
      element: <SettingsPage />,
    },
    {
      path: "/post",
      element: <PostPage />,
    },
    {
      path: "/edit/:image_name",
      element: <EditPage />,
    },
    {
      path: "/images/:image_name",
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;
