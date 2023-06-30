import React from "react";
import { PageLayout } from "../components/PageLayout";
import { Stack, Typography } from "@mui/material";
import { Login } from "./Login";

export const About: React.FC = () => {
  return (
    <PageLayout>
      <Stack alignItems={"center"} spacing={3}>
        <Typography variant="h2">caita</Typography>
        <Typography variant="h6">
          クリエイターのための作品管理プラットフォーム
        </Typography>
        <Stack alignItems={"center"} spacing={0}>
          <Typography variant="body1">
            Caitaとは、気軽に画像やイラストを投稿サービスです。
          </Typography>
          <Typography variant="body1">
            シンプルに作品管理し、評価や反応を気にすることなく作品を投稿・公開することができます。
          </Typography>
        </Stack>
        <Login />
      </Stack>
    </PageLayout>
  );
};
