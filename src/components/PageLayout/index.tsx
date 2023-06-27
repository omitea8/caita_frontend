import { Box, Stack } from "@mui/material";
import { Footer } from "./Footer";
import { MenuBar } from "./MenuBar";
import { ReactNode } from "react";

export const PageLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Stack
      spacing={3}
      alignItems={"center"}
      sx={{
        minHeight: "100vh",
      }}
    >
      <MenuBar />
      <Box width={812}>{children}</Box>
      <Footer />
    </Stack>
  );
};
