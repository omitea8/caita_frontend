import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import UploadIcon from "@mui/icons-material/Upload";
import SettingsIcon from "@mui/icons-material/Settings";
import PreviewIcon from "@mui/icons-material/Preview";
import LogoutIcon from "@mui/icons-material/Logout";
import { useQuery } from "@tanstack/react-query";

interface CreatorData {
  profile_image_url: string;
  username: string;
}

export const MenuBar: React.FC = () => {
  const navigate = useNavigate();

  const creatorQuery = useQuery<CreatorData, Error>(
    ["profile_image_url", "username"],
    () => {
      return fetch(
        `${
          process.env.REACT_APP_API_URL ?? ""
        }/creators/current_creator_profile`,
        {
          credentials: "include",
        }
      ).then((response) => {
        return response.json().then((data: CreatorData) => {
          return {
            profile_image_url: data.profile_image_url,
            username: data.username,
          };
        });
      });
    }
  );

  // settingの設定
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            navigate("/custom");
          }}
        >
          caita
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          size="small"
          sx={{ textTransform: "none", mr: 2 }}
          onClick={() => {
            navigate("/post");
          }}
        >
          <UploadIcon />
          投稿する
        </Button>

        <Button
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar src={creatorQuery.data?.profile_image_url}>C</Avatar>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
            sx: { "& .MuiMenuItem-root": { fontSize: "14px" } },
          }}
        >
          <MenuItem
            onClick={() => {
              navigate("/Settings");
            }}
          >
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            設定
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate(`/creator/${creatorQuery.data?.username ?? ""}`);
            }}
          >
            <ListItemIcon>
              <PreviewIcon fontSize="small" />
            </ListItemIcon>
            ユーザーページ
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              navigate(`/logout`);
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            ログアウト
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
