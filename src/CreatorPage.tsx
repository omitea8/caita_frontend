import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CreatorPage: React.FC = () => {
  const { creatorID } = useParams();
  const [iconUrl, setIconUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`creators/${creatorID}`)
      .then((response) => response.json())
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
    </div>
  );
};
