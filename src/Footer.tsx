import { Box } from "@mui/material";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 50,
        color: "white",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          margin: "0px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>Caitaについて</p>
        <p>© Caita</p>
      </div>
    </Box>
  );
};
