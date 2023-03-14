import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageList } from "./ImageList";

export const CreatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { creatorID } = useParams();
  const [iconUrl, setIconUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`/creators/${creatorID}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          navigate("/error-page");
        }
      })
      .then((data) => {
        setIconUrl(data.twitter_profile_image);
        setName(data.twitter_name);
        setDescription(data.twitter_description);
      });
  }, [creatorID]);

  return (
    <div>
      <p>creator page</p>
      <img src={iconUrl} alt="icon" />
      <p>{name}</p>
      <p>{description}</p>
      <ImageList />
    </div>
  );
};
