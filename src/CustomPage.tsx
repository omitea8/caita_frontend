import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageArray } from "./ImageArray";
import { Box } from "@mui/material";

interface ProfileData {
  profile_image_url: string;
  name: string;
  description: string;
  username: string;
}

export const CustomPage = () => {
  const [iconUrl, setIconUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/creators/profile_get")
      .then((response) => response.json())
      .then((data: ProfileData) => {
        setIconUrl(data.profile_image_url);
        setName(data.name);
        setDescription(data.description);
        setCreatorId(data.username);
      })
      .catch((error) => {
        console.error(error);
        navigate("/error");
      });
  });

  function postButton() {
    navigate("/post");
  }

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: 200,
          backgroundColor: "gray",
        }}
      />
      <button onClick={postButton}>新規投稿</button>
      <img src={iconUrl} alt="icon" />
      <p>{name}</p>
      <p>{description}</p>
      <ImageArray
        creatorId={creatorId}
        onClick={(imageId: string) => {
          console.log(imageId);
        }}
      />
    </div>
  );
};
