import { Box, Container } from "@mui/material";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import { ReactNode } from "react";

export const PageLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MenuBar />
      <Container
        sx={{
          width: 848,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
