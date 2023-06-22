import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import UploadIcon from "@mui/icons-material/Upload";

export const EditPage: React.FC = () => {
  const { image_name } = useParams();
  const [captionText, setCaptionText] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const navigate = useNavigate();

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
      enabled: captionText === "",
      refetchOnWindowFocus: false,
      staleTime: Infinity,
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
        if (response.status === 200) {
          toast.success("画像を編集しました");
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
    setCaptionText(event.target.value);
  };
  const upEditImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditImage(event.target.files ? event.target.files[0] : null);
  };

  return (
    <PageLayout>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h6">画像投稿</Typography>
        <form>
          <Stack spacing={1}>
            <TextField
              type="text"
              label="キャプション"
              multiline
              rows={3}
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
        </form>
        <Button
          variant="contained"
          onClick={() => {
            if (validate()) {
              editMutation.mutate();
            }
          }}
        >
          <UploadIcon />
          投稿を編集する
        </Button>
      </Stack>
    </PageLayout>
  );
};
