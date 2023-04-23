import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

interface Image {
  caption: string;
  image_url: string;
  id: string;
}

interface Props {
  onClick: (imageId: string) => void;
  creatorId: string;
  showItemBar: boolean;
}

export const ImageArray: React.FC<Props> = ({
  onClick,
  creatorId,
  showItemBar,
}) => {
  const [images, setImages] = useState<Image[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (creatorId == "") {
      return;
    }
    fetch(`/images/creator/${creatorId}`)
      .then((response) => response.json())
      .then((data: Image[]) => {
        setImages(data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/error");
      });
  }, [creatorId]);

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
              onClick(image.id);
            }}
          >
            <img
              src={`${image.image_url}`}
              alt={image.caption}
              loading="lazy"
            />
            {showItemBar && (
              <ImageListItemBar
                title={image.caption === "" ? "..." : image.caption}
                actionIcon={
                  <>
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={"edit"}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={"delete"}
                      size="small"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </>
                }
              />
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
