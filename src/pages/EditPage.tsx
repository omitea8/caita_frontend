import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckCircleOutline } from "@mui/icons-material";
import { useLoginCreator } from "./useLoginCreator";

export const EditPage: React.FC = () => {
  const { image_name } = useParams();
  const [captionEdited, setCaptionEdited] = useState(false);
  const [captionText, setCaptionText] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const navigate = useNavigate();

  useLoginCreator();

  // 画像情報の取得
  useQuery<string, Error>(
    ["caption", image_name],
    () => {
      return fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/images/${image_name ?? ""}`
      )
        .then((res) => res.json())
        .then((data: { caption: string }) => {
          return data.caption;
        });
    },
    {
      onSuccess: (caption: string) => {
        setCaptionText(caption);
      },
      enabled: !captionEdited,
      refetchOnWindowFocus: false,
    }
  );

  const editMutation = useMutation(
    () => {
      const data = new FormData();
      data.append("caption", captionText);
      if (editImage !== null) {
        data.append("image", editImage);
      }
      return fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/images/${image_name ?? ""}`,
        {
          method: "PUT",
          body: data,
          credentials: "include",
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.status === 204) {
          navigate("/custom");
        } else {
          toast.error("画像の編集に失敗しました");
        }
      },
    }
  );

  const validate = (): boolean => {
    if (editImage !== null) {
      const fileSizeInMB = editImage.size / (1024 * 1024);
      if (fileSizeInMB > 20) {
        toast.error("画像サイズは20MBまでです");
        return false;
      }
      if (!/^(image\/jpeg|image\/png|image\/gif)$/.test(editImage.type)) {
        toast.error("画像はjpeg, png, gifのいずれかで投稿してください");
        return false;
      }
    }
    if (captionText.length >= 1000) {
      toast.error("キャプションの文字数は1000文字までです");
      return false;
    }
    return true;
  };

  const upCaptionText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaptionEdited(true);
    setCaptionText(event.target.value);
  };
  const upEditImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditImage(event.target.files ? event.target.files[0] : null);
  };

  return (
    <PageLayout>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h6">画像編集</Typography>
        <Stack spacing={1}>
          <TextField
            type="text"
            label="キャプション"
            multiline
            minRows={3}
            sx={{ width: 600 }}
            helperText="キャプションは1000文字まで入力できます"
            value={captionText}
            onChange={upCaptionText}
          />
          <TextField
            type="file"
            helperText="画像は必須です"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                accept: "image/jpeg,image/png,image/gif",
              },
              disableUnderline: true,
            }}
            onChange={upEditImage}
          />
        </Stack>
        <Button
          variant="contained"
          startIcon={<CheckCircleOutline />}
          onClick={() => {
            if (validate()) {
              editMutation.mutate();
            }
          }}
        >
          編集を確定する
        </Button>
      </Stack>
    </PageLayout>
  );
};
