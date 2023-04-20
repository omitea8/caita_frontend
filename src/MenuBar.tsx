import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";

export const MenuBar: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "black", mb: 3, maxHeight: 70 }}
      elevation={0}
    >
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          caita
        </Typography>
        <Button color="inherit" sx={{ textTransform: "none", mr: 2 }}>
          upload
        </Button>
        <Avatar>C</Avatar>
      </Toolbar>
    </AppBar>
  );
};
