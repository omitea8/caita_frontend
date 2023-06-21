import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack } from "@mui/material";

export const ImagePage: React.FC = () => {
  const { image_name } = useParams();

  const imageQuery = useQuery<{ caption: string; image_url: string }, Error>(
    ["Image", image_name],
    () => {
      return fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/images/${image_name ?? ""}`
      ).then((response) => {
        return response
          .json()
          .then((data: { caption: string; image_url: string }) => {
            return {
              caption: data.caption,
              image_url: data.image_url,
            };
          });
      });
    }
  );

  return (
    <PageLayout>
      <Box sx={{ display: "flex" }}>
        <Stack>
          <Box sx={{ padding: "10px" }}>{imageQuery.data?.caption}</Box>
          <img
            src={imageQuery.data?.image_url}
            alt={imageQuery.data?.caption}
            style={{ maxWidth: "1200px", maxHeight: "800px" }}
          />
        </Stack>
      </Box>
    </PageLayout>
  );
};
