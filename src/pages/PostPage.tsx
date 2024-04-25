import React, { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useMutation } from "@tanstack/react-query";
import { useLoginCreator } from "./useLoginCreator";
import { LoadingButton } from "@mui/lab";
import { useDropzone } from "react-dropzone";
import { Upload as UploadIcon, Add as AddIcon } from "@mui/icons-material";

export const PostPage: FC = () => {
  const [captionText, setCaptionText] = useState("");
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  useLoginCreator();

  const postMutation = useMutation(
    () => {
      const data = new FormData();
      data.append("caption", captionText);
      if (file !== null) {
        data.append("image", file);
      }
      return fetch(`${process.env.REACT_APP_API_URL ?? ""}/images/post`, {
        method: "POST",
        body: data,
        credentials: "include",
      });
    },
    {
      onSuccess: (response) => {
        if (response.status === 201) {
          toast.success("投稿が完了しました");
          navigate("/custom");
        } else {
          toast.error("投稿に失敗しました");
        }
      },
    }
  );

  const validate = (): boolean => {
    if (file === null) {
      toast.error("画像が選択されていません");
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

  // ドロップゾーンの設定
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    onDropRejected: (fileRejections) => {
      if (fileRejections.length > 1) {
        toast.error("投稿できる画像は1つだけです");
      }
      if (fileRejections[0].errors[0].code === "file-invalid-type") {
        toast.error("画像はjpeg, png, webpのいずれかで投稿してください");
      }
      if (fileRejections[0].errors[0].code === "file-too-large") {
        toast.error("画像サイズは20MBまでです");
      }
      console.log(fileRejections);
    },
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }
      setFile(acceptedFiles[0]);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
      console.log(acceptedFiles);
    },
  });
  useEffect(() => {
    // メモリリークを避けるためにデータURIを削除する。アンマウント時に実行される。
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

  return (
    <PageLayout>
      <Stack alignItems="center">
        <Stack alignItems="center" spacing={3} sx={{ width: "70%" }}>
          <Box
            {...getRootProps({
              style: {
                border: isDragActive ? "2px dashed #2196f3" : "2px dashed #ccc",
                borderRadius: "10px",
                width: "100%",
                padding: "20px 0px",
                backgroundColor: "#fafafa",
                color: "#a9a9a9",
                transition: "border .24s ease-in-out",
              },
            })}
          >
            {/* react-dropzoneのチュートリアル通りinputを使用している */}
            <input {...getInputProps()} />
            <Stack alignItems="center" spacing={2}>
              <Typography>ここに画像をドラッグ&ドロップ</Typography>
              {preview ? (
                <img src={preview} style={{ width: 200 }} />
              ) : (
                <AddIcon sx={{ fontSize: 50 }} />
              )}
              <Typography variant="caption" color={"gray"}>
                画像は必須・jpeg, png, webp形式の画像・最大20MBまで
              </Typography>
            </Stack>
          </Box>

          <TextField
            type="text"
            label="キャプション"
            multiline
            minRows={3}
            fullWidth
            helperText="キャプションは1000文字まで入力できます"
            value={captionText}
            onChange={upCaptionText}
            disabled={postMutation.isLoading}
          />

          <LoadingButton
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => {
              if (validate()) {
                postMutation.mutate();
              }
            }}
            loadingPosition="start"
            loading={postMutation.isLoading}
          >
            投稿する
          </LoadingButton>
        </Stack>
        <Toaster position="top-center" reverseOrder={false} />
      </Stack>
    </PageLayout>
  );
};
