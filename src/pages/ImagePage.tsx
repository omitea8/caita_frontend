import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useQuery } from "@tanstack/react-query";

export const ImagePage: React.FC = () => {
  const { storage_name } = useParams();

  const imageQuery = useQuery<{ caption: string; image_url: string }, Error>(
    ["Image", storage_name],
    () => {
      return fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/images/${storage_name ?? ""}`
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
      <p>{imageQuery.data?.caption}</p>
      <img
        src={imageQuery.data?.image_url}
        alt={imageQuery.data?.caption}
        style={{ maxWidth: "1200px", maxHeight: "800px" }}
      />
    </PageLayout>
  );
};
