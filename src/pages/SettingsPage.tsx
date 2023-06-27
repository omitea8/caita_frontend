import React from "react";
import { PageLayout } from "../components/PageLayout";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Stack, Typography } from "@mui/material";
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
            navigate("/");
          }}
          color="error"
        >
          アカウントの削除
        </Button>
      </Stack>
    </PageLayout>
  );
};
