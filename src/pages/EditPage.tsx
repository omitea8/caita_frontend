import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";

export const EditPage: React.FC = () => {
  const { imageId } = useParams();
  const [captionText, setCaptionText] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const navigate = useNavigate();

  // 画像情報の取得
  useEffect(() => {
    fetch(`/images/${imageId ?? ""}`)
      .then((response) => response.json())
      .then((data: { caption: string }) => {
        setCaptionText(data.caption);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [imageId]);

  const edit = (clickedImageId: string) => {
    //バリデーション
    if (editImage !== null) {
      const fileSizeInMB = editImage.size / (1024 * 1024);
      if (fileSizeInMB > 20) {
        toast.error("画像サイズは20MBまでです");
        return;
      }
      if (!/^(image\/jpeg|image\/png|image\/gif)$/.test(editImage.type)) {
        toast.error("画像はjpeg, png, gifのいずれかで投稿してください");
        return;
      }
    }

    if (captionText.length > 1000) {
      toast.error("キャプションの文字数は1000文字までです");
      return;
    }
    // 画像編集
    const data = new FormData();
    data.append("caption", captionText);
    if (editImage !== null) {
      data.append("image", editImage);
    }

    fetch(`/images/${clickedImageId}`, {
      method: "PUT",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "OK") {
          toast.success("投稿を編集しました");
          navigate(`/custom`);
        } else {
          toast.error("投稿に失敗しました");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("投稿の編集に失敗しました");
      });
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
          edit(imageId ?? "");
        }}
      >
        投稿を編集する
      </button>
    </PageLayout>
  );
};
