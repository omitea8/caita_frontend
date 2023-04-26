import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
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

  // Dialogの設定
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
                      <DeleteForeverIcon onClick={handleClickOpen} />
                    </IconButton>
                  </>
                }
              />
            )}
          </ImageListItem>
        ))}
      </ImageList>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title" sx={{ minWidth: 350 }}>
          {"画像を削除しますか？"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>やめる</Button>
          <Button onClick={handleClose} color="error">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
