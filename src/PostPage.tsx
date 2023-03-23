import { FC, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PostPage: FC = () => {
  const [captionText, setCaptionText] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const Post = () => {
    const data = new FormData();
    data.append("caption", captionText);
    console.log(postImage);
    if (postImage) {
      data.append("image", postImage);
    }
    fetch("/images/post", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "OK") {
          toast.success("投稿しました");
          navigate("/MyPage");
        } else {
          toast.error("投稿に失敗しました");
        }
      })
      .catch((error) => {
        toast.error("エラー");
      });
    setCaptionText("");
    setPostImage(null);
  };

  const upCaptionText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaptionText(event.target.value);
  };
  const upPostImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files);
      setPostImage(event.target.files[0]);
    }
  };

  return (
    <div>
      <p>caita</p>
      <form>
        <TextField type="text" value={captionText} onChange={upCaptionText} />
        <TextField
          type="file"
          onChange={upPostImage}
          InputLabelProps={{ shrink: true }}
          InputProps={{ disableUnderline: true }}
        />
      </form>
      <p>
        <button onClick={Post}>投稿</button>
      </p>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
