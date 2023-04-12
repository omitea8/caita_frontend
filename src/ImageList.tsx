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
      <ImageList sx={{ width: 1200, height: 800 }} cols={4} rowHeight={300}>
        {images.map((image) => (
          <ImageListItem
            key={image.image_url}
            onClick={() => {
              navigate(`/images/${image.id}`);
            }}
          >
            <img
              src={`${image.image_url}?w=100&h=100fit=crop&auto=format`}
              srcSet={`${image.image_url}?w=100&h=100&fit=crop&auto=form&dpr=2 2x`}
              alt={image.caption}
              style={{ maxWidth: "300px", maxHeight: "300px" }}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
