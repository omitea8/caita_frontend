import { FC, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PostPage: FC = () => {
  const [captionText, setCaptionText] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const Post = () => {
    //バリデーション
    if (postImage === null) {
      toast.error("画像が選択されていません");
      return;
    }
    const fileSizeInMB = postImage.size / (1024 * 1024);
    if (fileSizeInMB > 20) {
      toast.error("画像サイズは20MBまでです");
      return;
    }
    if (!/^(image\/jpeg|image\/png|image\/gif)$/.test(postImage.type)) {
      toast.error("画像はjpeg, png, gifのいずれかで投稿してください");
      return;
    }
    if (captionText.length > 1000) {
      toast.error("キャプションの文字数は1000文字までです");
      return;
    }
    //画像投稿機能
    const data = new FormData();
    data.append("caption", captionText);
    data.append("image", postImage);

    fetch("/images/post", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "OK") {
          toast.success("投稿が完了しました");
          navigate("/custom");
        } else {
          toast.error("投稿に失敗しました");
        }
      })
      .catch((error) => {
        toast.error("エラーです");
        console.log(error);
      });
  };

  const upCaptionText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaptionText(event.target.value);
  };
  const upPostImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostImage(event.target.files ? event.target.files[0] : null);
  };

  return (
    <div>
      <p>caita</p>
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
          onChange={upPostImage}
        />
      </form>
      <p>
        <button onClick={Post}>投稿</button>
      </p>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
