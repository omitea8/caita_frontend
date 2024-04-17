import React, { FC, useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useMutation } from "@tanstack/react-query";
import { useLoginCreator } from "./useLoginCreator";
import { LoadingButton } from "@mui/lab";
import { useDropzone } from "react-dropzone";
import { Upload as UploadIcon, Add as AddIcon } from "@mui/icons-material";

export const PostPage: FC = () => {
  const [captionText, setCaptionText] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const navigate = useNavigate();

  useLoginCreator();

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
    if (postImage === null) {
      toast.error("画像が選択されていません");
      return false;
    }
    const fileSizeInMB = postImage.size / (1024 * 1024);
    if (fileSizeInMB > 20) {
      toast.error("画像サイズは20MBまでです");
      return false;
    }
    if (!/^(image\/jpeg|image\/png|image\/webp)$/.test(postImage.type)) {
      toast.error("画像はjpeg, png, webpのいずれかで投稿してください");
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

  // ドロップゾーンの設定
  interface FileWithPreview extends File {
    preview: string;
  }
  // ドロップゾーンの初期化
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    marginTop: 16,
  };
  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box" as const,
  };
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };
  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map(
          (file) =>
            ({
              ...file,
              preview: URL.createObjectURL(file),
            } as FileWithPreview)
        )
      );
    },
  });
  const thumbs = files.map((file: FileWithPreview) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  // ドロップゾーンのスタイル
  const style = {
    border: isDragActive ? "2px dashed blue" : "2px dashed #ccc",
    borderRadius: "10px",
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
    padding: "10px 30px",
    backgroundColor: "#fafafa",
    color: "#a9a9a9",
    transition: "border .24s ease-in-out",
  };

  return (
    <PageLayout>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h6">画像投稿</Typography>

        {/* <TextField
          type="file"
          sx={{ width: "80%" }}
          helperText="画像は必須です"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputProps: {
              accept: "image/jpeg,image/png,image/webp",
            },
            disableUnderline: true,
          }}
          onChange={upPostImage}
          disabled={postMutation.isLoading}
        /> */}

        <Stack alignItems={"center"}>
          <Stack {...getRootProps({ className: "dropzone", style })}>
            <input {...getInputProps()} />
            <Stack alignItems="center" spacing={2}>
              {isDragActive ? (
                <p>画像を持ってきた時の動き</p>
              ) : (
                <p>初期表示されてる動き</p>
              )}
              <AddIcon sx={{ fontSize: 50 }} />
              <Typography>
                ここに画像をドラック＆ドロップするか、クリックしてファイルを選択
              </Typography>
              <aside style={thumbsContainer}>{thumbs}</aside>
            </Stack>
          </Stack>
          <Typography variant="overline" color={"gray"}>
            画像は必須です。jpeg, png, webp形式の画像、最大20MBまで。
          </Typography>
        </Stack>

        <TextField
          type="text"
          label="キャプション"
          multiline
          minRows={3}
          sx={{ width: "80%" }}
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
    </PageLayout>
  );
};
