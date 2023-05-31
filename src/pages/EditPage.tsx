import { TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useMutation, useQuery } from "@tanstack/react-query";

interface ImageData {
  caption: string;
}

export const EditPage: React.FC = () => {
  const { imageId } = useParams();
  const [captionText, setCaptionText] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const navigate = useNavigate();

  // 画像情報の取得
  useQuery<string, Error>(
    ["caption", imageId],
    () => {
      return fetch(`/images/${imageId ?? ""}`)
        .then((res) => res.json())
        .then((data: ImageData) => {
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
      return fetch(`/images/${imageId ?? ""}`, {
        method: "PUT",
        body: data,
      });
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
      <p>Edit Page</p>
      <form>
        <TextField type="text" value={captionText} onChange={upCaptionText} />
        <TextField
          type="file"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputProps: {
              accept: "image/jpeg,image/png,image/gif",
            },
            disableUnderline: true,
          }}
          onChange={upEditImage}
        />
      </form>
      <button
        onClick={() => {
          if (validate()) {
            editMutation.mutate();
          }
        }}
      >
        投稿を編集する
      </button>
    </PageLayout>
  );
};
