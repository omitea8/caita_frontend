import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Image {
  caption: string;
  image_url: string;
  image_name: string;
}
interface Props {
  onClick?: (imageName: string) => void;
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
      return fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/images/creator/${creatorId}`
      ).then((response) => response.json());
    },
    {
      enabled: creatorId !== "",
      initialData: [],
    }
  );

  // Dialogの設定
  const [open, setOpen] = React.useState(false);
  const [clickedImageName, setClickedImageName] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // 画像の削除
  const deleteMutation = useMutation(
    (image_name: string) => {
      return fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/images/${image_name}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.status === 204) {
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
      <ImageList variant="quilted" cols={4} rowHeight={200} sx={{ m: 0 }}>
        {imagesQuery.data.map((image) => (
          <ImageListItem
            key={image.image_url}
            onClick={() => {
              onClick?.(image.image_name);
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
                  <Stack direction="row">
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={"view"}
                      size="small"
                    >
                      <VisibilityIcon
                        onClick={() => {
                          navigate(`/images/${image.image_name}`);
                        }}
                      />
                    </IconButton>
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={"edit"}
                      size="small"
                    >
                      <EditIcon
                        onClick={() => {
                          setClickedImageName(image.image_name);
                          navigate(`/edit/${image.image_name}`);
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
                          setClickedImageName(image.image_name);
                          handleClickOpen();
                        }}
                      />
                    </IconButton>
                  </Stack>
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
              deleteMutation.mutate(clickedImageName);
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
