import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MyPage = () => {
  const [iconUrl, setIconUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/creators/getprofile")
      .then((response) => response.json())
      .then((data) => {
        setIconUrl(data.profile_image_url);
        setName(data.name);
        setDescription(data.description);
      });
  });

  function postButton() {
    navigate("/PostPage");
  }

  return (
    <div>
      <button onClick={postButton}>新規投稿</button>
      <p>caita MyaPage</p>
      <img src={iconUrl} alt="icon" />
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};
