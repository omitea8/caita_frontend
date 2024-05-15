import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: 50,
        color: "white",
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <div
        style={{
          margin: "0px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          color="inherit"
          sx={{ textTransform: "none", mr: 2 }}
          onClick={() => {
            navigate("/about");
          }}
        >
          caitaについて
        </Button>
        <p>© caita</p>
      </div>
    </Box>
  );
};
