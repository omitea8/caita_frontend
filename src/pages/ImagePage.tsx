import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";

export const ImagePage: React.FC = () => {
  const { image_name } = useParams();

  const imageQuery = useQuery<
    { caption: string; image_url: string; webp_image_url: string },
    Error
  >(["Image", image_name], () => {
    return fetch(
      `${process.env.REACT_APP_API_URL ?? ""}/images/${image_name ?? ""}`
    ).then((response) => {
      return response
        .json()
        .then(
          (data: {
            caption: string;
            image_url: string;
            webp_image_url: string;
          }) => {
            return {
              caption: data.caption,
              image_url: data.image_url,
              webp_image_url: data.webp_image_url,
            };
          }
        );
    });
  });
  console.log(imageQuery.data);

  return (
    <PageLayout>
      <Stack spacing={1}>
        <Typography>{imageQuery.data?.caption}</Typography>
        <a href={imageQuery.data?.image_url ?? ""} target="_blank">
          <img
            src={imageQuery.data?.webp_image_url}
            alt={imageQuery.data?.caption}
            style={{ maxWidth: "100%" }}
          />
        </a>
      </Stack>
    </PageLayout>
  );
};
