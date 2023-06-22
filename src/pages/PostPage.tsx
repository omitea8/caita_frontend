import { FC, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useMutation } from "@tanstack/react-query";
import UploadIcon from "@mui/icons-material/Upload";

export const PostPage: FC = () => {
  const [captionText, setCaptionText] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const postMutation = useMutation(
    () => {
      const data = new FormData();
      data.append("caption", captionText);
      if (postImage !== null) {
        data.append("image", postImage);
      }
      return fetch(`${process.env.REACT_APP_API_URL ?? ""}/images/post`, {
        method: "POST",
        body: data,
        credentials: "include",
      });
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          toast.success("投稿が完了しました");
          navigate("/custom");
        } else {
          toast.error("投稿に失敗しました");
        }
      },
    }
  );

  const validate = (): boolean => {
    if (postImage === null) {
      toast.error("画像が選択されていません");
      return false;
    }
    const fileSizeInMB = postImage.size / (1024 * 1024);
    if (fileSizeInMB > 20) {
      toast.error("画像サイズは20MBまでです");
      return false;
    }
    if (!/^(image\/jpeg|image\/png|image\/gif)$/.test(postImage.type)) {
      toast.error("画像はjpeg, png, gifのいずれかで投稿してください");
      return false;
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
  const upPostImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostImage(event.target.files ? event.target.files[0] : null);
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
              onChange={upPostImage}
            />
          </Stack>
        </form>
        <Button
          variant="contained"
          onClick={() => {
            if (validate()) {
              postMutation.mutate();
            }
          }}
        >
          <UploadIcon />
          投稿する
        </Button>
      </Stack>
      <Toaster position="top-center" reverseOrder={false} />
    </PageLayout>
  );
};
