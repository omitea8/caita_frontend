import { ImageList, ImageListItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Image {
  caption: string;
  image_url: string;
  id: string;
}

export const ImageArray: React.FC = () => {
  const { creatorID } = useParams();
  const [images, setImages] = useState<Image[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/images/creator/${creatorID ?? ""}`)
      .then((response) => response.json())
      .then((data: Image[]) => {
        setImages(data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/error-page");
      });
  }, [creatorID]);

  // Grid flex layout
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
      }}
    >
      <ImageList variant="quilted" sx={{ width: 800 }} cols={4} rowHeight={200}>
        {images.map((image) => (
          <ImageListItem
            key={image.image_url}
            onClick={() => {
              navigate(`/images/${image.id}`);
            }}
          >
            <img
              src={`${image.image_url}`}
              alt={image.caption}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
