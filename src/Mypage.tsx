import { useEffect, useState } from "react";

export const Mypage = () => {
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  useEffect(() => {
    fetch("/users/getApi")
      .then((response) => response.json())
      .then((data) => {
        setName(data.username);
        setIconUrl(data.profile_image_url);
      });
  });
  return (
    <div>
      <p>caita mypage</p>
      <img src={iconUrl} />
      <p>{name}</p>
    </div>
  );
};