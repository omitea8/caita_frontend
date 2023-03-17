import { FC, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

export const PostPage: FC = () => {
  const [captionText, setCaptionText] = useState("");
  const navigate = useNavigate();

  const Post = () => {
    const data = { caption: captionText };
    fetch("/images/post", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data === "OK") {
          toast.success("投稿しました");
          navigate("/PostPage");
        } else {
          toast.error("投稿に失敗しました");
          navigate("/PostPage");
        }
        console.log(data);
      });
    setCaptionText("");
  };

  const upCaptionText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaptionText(event.target.value);
  };
  return (
    <div>
      <p>caita</p>
      <TextField label="caption" value={captionText} onChange={upCaptionText} />
      <p>
        <button onClick={Post}>投稿</button>
      </p>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
