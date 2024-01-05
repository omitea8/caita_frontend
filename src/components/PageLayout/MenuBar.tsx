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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import UploadIcon from "@mui/icons-material/Upload";
import SettingsIcon from "@mui/icons-material/Settings";
import PreviewIcon from "@mui/icons-material/Preview";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CaitaLogo } from "../CaitaLogo";
import { LoginButton } from "../LoginButton";

interface ProfileData {
  profile_image_url: string;
  name: string;
  description: string;
  username: string;
}

export const MenuBar: React.FC = () => {
  const navigate = useNavigate();

  // TODO: 複雑化しているのでフックに切り出すか検討
  const profileQuery = useQuery<ProfileData, Error>(["profile"], () => {
    return fetch(
      `${process.env.REACT_APP_API_URL ?? ""}/creators/current_creator_profile`,
      {
        credentials: "include",
      }
    ).then((res) => res.json());
  });

  const login = profileQuery.data?.name !== "Not Login";

  // iconMenuBarの設定
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ログアウト
  const logoutMutation = useMutation(
    () => {
      return fetch(`${process.env.REACT_APP_API_URL ?? ""}/creators/logout`, {
        method: "POST",
        credentials: "include",
      });
    },
    {
      onSuccess: (response) => {
        if (response.status == 200) {
          toast.success("ログアウトしました");
          navigate("/");
        } else {
          toast.error("ログアウトに失敗しました");
        }
      },
    }
  );

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "black", maxHeight: 70 }}
      elevation={0}
    >
      <Toolbar>
        <CaitaLogo size="h3" navigatePage={login ? "/custom" : "/"} />
        <Box sx={{ flexGrow: 1 }} />
        {login && (
          <Button
            color="inherit"
            size="small"
            sx={{ textTransform: "none", mr: 2 }}
            startIcon={<UploadIcon />}
            onClick={() => {
              navigate("/post");
            }}
          >
            投稿する
          </Button>
        )}

        {login ? (
          <Button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar src={profileQuery.data?.profile_image_url}>C</Avatar>
          </Button>
        ) : (
          <LoginButton />
        )}
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
              navigate(`/creator/${profileQuery.data?.username ?? ""}`);
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
              logoutMutation.mutate();
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
