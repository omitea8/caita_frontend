import React from "react";
import { PageLayout } from "../components/PageLayout";
import { Stack, Typography } from "@mui/material";
import { Login } from "../components/LoginButton";
import { CaitaLogo } from "../components/Caita.Logo";

export const About: React.FC = () => {
  return (
    <PageLayout>
      <Stack alignItems={"center"} spacing={3}>
        <CaitaLogo size="h1" />
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
