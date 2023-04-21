import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "./PageLayout";

interface ImageData {
  caption: string;
  image_url: string;
}

export const ImagePage: React.FC = () => {
  const { imageId } = useParams();
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(`/images/${imageId ?? ""}`)
      .then((response) => response.json())
      .then((data: ImageData) => {
        setCaption(data.caption);
        setImageUrl(data.image_url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [imageId]);

  return (
    <PageLayout>
      <p>{caption}</p>
      <img
        src={imageUrl}
        alt={caption}
        style={{ maxWidth: "1200px", maxHeight: "800px" }}
      />
    </PageLayout>
  );
};
