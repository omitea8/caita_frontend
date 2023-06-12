import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { ImageArray } from "../components/ImageArray";
import { useQuery } from "@tanstack/react-query";

interface CreatorData {
  twitter_profile_image: string;
  twitter_name: string;
  twitter_description: string;
}

export const CreatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { creatorId } = useParams();

  const creatorQuery = useQuery<
    {
      iconUrl: string;
      name: string;
      description: string;
    },
    Error
  >(
    ["creator", creatorId],
    () => {
      return fetch(`/creators/${creatorId ?? ""}`).then((response) => {
        return response.json().then((data: CreatorData) => {
          return {
            iconUrl: data.twitter_profile_image,
            name: data.twitter_name,
            description: data.twitter_description,
          };
        });
      });
    },
    { enabled: creatorId !== undefined }
  );

  return (
    <PageLayout>
      <p>creator page</p>
      <img src={creatorQuery.data?.iconUrl} alt="icon" />
      <p>{creatorQuery.data?.name}</p>
      <p>{creatorQuery.data?.description}</p>
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
