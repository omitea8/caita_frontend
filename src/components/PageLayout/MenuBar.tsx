import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import { useEffect, useState } from "react";

export const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const [iconUrl, setIconUrl] = useState("");

  useEffect(() => {
    fetch("creators/icon_image")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIconUrl(data as string);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "black", mb: 3, maxHeight: 70 }}
      elevation={0}
    >
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          caita
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          sx={{ textTransform: "none", mr: 2 }}
          onClick={() => {
            navigate("/post");
          }}
        >
          <UploadIcon />
          upload
        </Button>
        <Avatar src={iconUrl}>C</Avatar>
      </Toolbar>
    </AppBar>
  );
};
