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
import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Image {
  caption: string;
  image_url: string;
  id: string;
}
interface Props {
  onClick?: (imageId: string) => void;
  creatorId: string;
  showItemBar: boolean;
}

export const ImageArray: React.FC<Props> = ({
  onClick,
  creatorId,
  showItemBar,
}) => {
  const navigate = useNavigate();
  const imagesQuery = useQuery<Image[], Error>(
    ["images", creatorId],
    () => {
      return fetch(`/images/creator/${creatorId}`).then((response) =>
        response.json()
      );
    },
    {
      enabled: creatorId !== "",
      initialData: [],
    }
  );

  // Dialogの設定
  const [open, setOpen] = React.useState(false);
  const [clickedImageId, setClickedImageId] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // 画像の削除
  const deleteMutation = useMutation(
    (imageId: string) => {
      return fetch(`/images/${imageId}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          toast.success("画像を削除しました");
          imagesQuery.refetch().catch(console.error);
          setOpen(false);
        } else {
          toast.error("画像の削除に失敗しました");
        }
      },
    }
  );

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
      }}
    >
      <ImageList variant="quilted" sx={{ width: 800 }} cols={4} rowHeight={200}>
        {imagesQuery.data.map((image) => (
          <ImageListItem
            key={image.image_url}
            onClick={() => {
              onClick?.(image.id);
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
                      <EditIcon
                        onClick={() => {
                          setClickedImageId(image.id);
                          navigate(`/edit/${image.id}`);
                        }}
                      />
                    </IconButton>
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={"delete"}
                      size="small"
                    >
                      <DeleteForeverIcon
                        onClick={() => {
                          setClickedImageId(image.id);
                          handleClickOpen();
                        }}
                      />
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
          画像を削除しますか？
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>やめる</Button>
          <Button
            onClick={() => {
              deleteMutation.mutate(clickedImageId);
            }}
            color="error"
          >
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
