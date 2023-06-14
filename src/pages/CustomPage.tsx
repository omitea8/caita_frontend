import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageArray } from "../components/ImageArray";
import { PageLayout } from "../components/PageLayout";

interface ProfileData {
  profile_image_url: string;
  name: string;
  description: string;
  username: string;
}

export const CustomPage = () => {
  const [creatorId, setCreatorId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL ?? ""}/creators/profile_get`)
      .then((response) => response.json())
      .then((data: ProfileData) => {
        setCreatorId(data.username);
      })
      .catch((error) => {
        console.error(error);
        navigate("/error");
      });
  });

  return (
    <PageLayout>
      <ImageArray creatorId={creatorId} showItemBar={true} />
    </PageLayout>
  );
};
