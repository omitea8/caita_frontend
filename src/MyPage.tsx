import { useEffect, useState } from "react";

export const MyPage = () => {
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  useEffect(() => {
    fetch("/users/getProfile")
      .then((response) => response.json())
      .then((data) => {
        setName(data.username);
        setIconUrl(data.profile_image_url);
      });
  });
  return (
    <div>
      <p>caita MyaPage</p>
      <img src={iconUrl} />
      <p>{name}</p>
    </div>
  );
};
