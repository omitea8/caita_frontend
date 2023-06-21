import React from "react";
import { PageLayout } from "../components/PageLayout";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Stack, Typography } from "@mui/material";
import { type } from "os";
import { error } from "console";

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
      <Box sx={{ display: "flex" }}>
        <Stack alignItems="center" spacing={1}>
          <Typography variant="h6" component="div">
            プロフィール情報
          </Typography>
          <Typography variant="body2" component="div">
            名前
          </Typography>
          <Typography variant="h5" component="div">
            {profileQuery.data?.name}
          </Typography>
          <Typography variant="body2" component="div">
            ID
          </Typography>
          <Typography variant="h5" component="div">
            {profileQuery.data?.username}
          </Typography>
          <Typography variant="body2" component="div">
            自己紹介
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ maxWidth: 700, width: "100%", display: "flex" }}
          >
            {profileQuery.data?.description}
          </Typography>

          <Button
            onClick={() => {
              navigate("/");
            }}
            color="error"
          >
            アカウントの削除
          </Button>
        </Stack>
      </Box>
    </PageLayout>
  );
};
