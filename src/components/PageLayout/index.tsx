import { Box, Container } from "@mui/material";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import { ReactNode } from "react";

export const PageLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <MenuBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0px 15px 30px",
          flexGrow: 1,
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
