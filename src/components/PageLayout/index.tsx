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
      <Stack
        justifyContent={"flex-start"}
        alignItems={"center"}
        spacing={1}
        sx={{
          width: 812,
          display: "flex",
          flexGrow: 1,
        }}
      >
        {children}
      </Stack>
      <Footer />
    </Stack>
  );
};
