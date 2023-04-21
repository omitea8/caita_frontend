import { Box } from "@mui/material";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
        <Box>{children}</Box>
      </Box>
      <Footer />
    </Box>
  );
};
