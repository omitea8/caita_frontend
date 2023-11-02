import React from "react";
import { PageLayout } from "../components/PageLayout";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

interface ProfileData {
  profile_image_url: string;
  name: string;
  description: string;
  username: string;
}

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const profileQuery = useQuery<ProfileData, Error>(["profile"], () => {
    return fetch(
      `${process.env.REACT_APP_API_URL ?? ""}/creators/current_creator_profile`,
      {
        credentials: "include",
      }
    ).then((res) => res.json());
  });

  const deleteCreatorMutation = useMutation(
    () => {
      return fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/creators/delete_creator`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
    },
    {
      onSuccess: () => {
        navigate("/");
      },
    }
  );
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PageLayout>
      <Stack alignItems="center" spacing={1}>
        <Typography variant="h6">プロフィール情報</Typography>
        <Typography variant="body2">名前</Typography>
        <Typography variant="h5">{profileQuery.data?.name}</Typography>
        <Typography variant="body2">ID</Typography>
        <Typography variant="h5">{profileQuery.data?.username}</Typography>
        <Typography variant="body2">自己紹介</Typography>
        <Typography variant="body1" component="div">
          {profileQuery.data?.description}
        </Typography>

        <Button
          startIcon={<DeleteForever />}
          onClick={() => {
            handleClickOpen();
          }}
          color="error"
        >
          アカウントの削除
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ minWidth: 350 }}>
            {"アカウントを削除しますか？"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              アカウントを削除すると、投稿した画像はすべてその瞬間に削除されます。また、削除したアカウントや投稿した画像は復元することはできません。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>やめる</Button>
            <Button
              onClick={() => {
                deleteCreatorMutation.mutate();
              }}
              color="error"
              autoFocus
            >
              アカウントを削除する
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </PageLayout>
  );
};
