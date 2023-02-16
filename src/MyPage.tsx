import { useEffect, useState } from "react";

export const MyPage = () => {
  const [iconUrl, setIconUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("/users/getprofile")
      .then((response) => response.json())
      .then((data) => {
        setIconUrl(data.profile_image_url);
        setName(data.username);
        setDescription(data.description);
      });
  });
  return (
    <div>
      <p>caita MyaPage</p>
      <img src={iconUrl} alt="icon" />
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};
