import { Box, Container } from "@mui/material";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <MenuBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 135px)",
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
