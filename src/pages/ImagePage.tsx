import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useQuery } from "@tanstack/react-query";

interface ImageData {
  caption: string;
  image_url: string;
}

export const ImagePage: React.FC = () => {
  const { imageId } = useParams();

  const imageQuery = useQuery<{ caption: string; image_url: string }, Error>(
    ["Image", imageId],
    () => {
      return fetch(`/images/${imageId ?? ""}`).then((response) => {
        return response.json().then((data: ImageData) => {
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
