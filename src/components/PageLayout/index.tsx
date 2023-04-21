import { Box, Container } from "@mui/material";
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
      <Container
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0px 15px 30px",
          flexGrow: 1,
        }}
      >
        <Box>{children}</Box>
      </Container>
      <Footer />
    </Box>
  );
};
