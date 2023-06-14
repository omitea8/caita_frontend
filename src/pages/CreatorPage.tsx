import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { ImageArray } from "../components/ImageArray";

interface CreatorData {
  twitter_profile_image: string;
  twitter_name: string;
  twitter_description: string;
}

export const CreatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { creatorId } = useParams();
  const [iconUrl, setIconUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!creatorId) {
      return;
    }
    fetch(`/creators/${creatorId}`)
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
        navigate("/error");
      });
  }, [creatorId, navigate]);

  return (
    <PageLayout>
      <p>creator page</p>
      <img src={iconUrl} alt="icon" />
      <p>{name}</p>
      <p>{description}</p>
      <ImageArray
        creatorId={creatorId ?? ""}
        onClick={(imageId: string) => {
          navigate(`/images/${imageId}`);
        }}
        showItemBar={false}
      />
    </PageLayout>
  );
};
