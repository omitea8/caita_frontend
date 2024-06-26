import React from "react";
import { PageLayout } from "../components/PageLayout";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
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
import { useLoginCreator } from "./useLoginCreator";

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const loginCreator = useLoginCreator();

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
      onSuccess: (response) => {
        if (response.status === 200) {
          toast.success("アカウントを削除しました");
          navigate("/");
        } else if (response.status === 401) {
          toast.error("再度ログインして操作してください");
          navigate("/about");
        } else {
          toast.error("アカウントの削除に失敗しました");
        }
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
        <Typography variant="h5">{loginCreator?.name}</Typography>
        <Typography variant="body2">ID</Typography>
        <Typography variant="h5">{loginCreator?.username}</Typography>
        <Typography variant="body2">自己紹介</Typography>
        <Typography variant="body1" component="div">
          {loginCreator?.description}
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
            <Button onClick={handleClose} color="secondary">
              やめる
            </Button>
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
      <Toaster position="top-center" reverseOrder={false} />
    </PageLayout>
  );
};
