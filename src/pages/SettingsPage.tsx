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
import toast from "react-hot-toast";

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

  // Dialogの設定
  const [open, setOpen] = React.useState(false);
  const [clickedCreatorId, setClickedCreatorId] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // アカウントの削除
  const deleteMutation = useMutation(
    (creatorID: string) => {
      return fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/creators/${creatorID}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          toast.success("アカウントを削除しました。");
          // imagesQuery.refetch().catch(console.error);
          navigate("/");
        } else {
          toast.error("アカウントの削除に失敗しました。");
        }
      },
    }
  );

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
          variant="outlined"
          color="error"
          startIcon={<DeleteForever />}
          onClick={() => {
            setClickedCreatorId(profileQuery.data?.username ?? "");
            handleClickOpen();
          }}
        >
          アカウントの削除
        </Button>
        {/* Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            アカウントを削除しますか？
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              アカウントの削除を行うと、アカウントは即時削除され投稿した画像も全て削除されます。
              また、削除したアカウントは復元できません。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>やめる</Button>
            <Button
              onClick={() => {
                deleteMutation.mutate(clickedCreatorId);
              }}
              color="error"
            >
              削除する
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </PageLayout>
  );
};
