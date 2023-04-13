import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageArray } from "./ImageArray";

interface CreatorData {
  twitter_profile_image: string;
  twitter_name: string;
  twitter_description: string;
}

export const CreatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { creatorID } = useParams();
  const [iconUrl, setIconUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!creatorID) {
      return;
    }
    fetch(`/creators/${creatorID}`)
      .then((response) => {
        if (response.ok) {
          return response.json() as Promise<CreatorData>;
        } else {
          throw new Error("データの取得に失敗しました");
        }
      })
      .then((data) => {
        setIconUrl(data.twitter_profile_image);
        setName(data.twitter_name);
        setDescription(data.twitter_description);
      })
      .catch((error) => {
        console.error(error);
        navigate("/error-page");
      });
  }, [creatorID, navigate]);

  return (
    <div>
      <p>creator page</p>
      <img src={iconUrl} alt="icon" />
      <p>{name}</p>
      <p>{description}</p>
      <ImageArray />
    </div>
  );
};
