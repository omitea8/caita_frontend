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

export const MenuBar: React.FC = () => {
  const navigate = useNavigate();
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
        <Avatar>C</Avatar>
      </Toolbar>
    </AppBar>
  );
};
