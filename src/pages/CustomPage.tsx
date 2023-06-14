import { ImageArray } from "../components/ImageArray";
import { PageLayout } from "../components/PageLayout";
import { useQuery } from "@tanstack/react-query";

interface ProfileData {
  profile_image_url: string;
  name: string;
  description: string;
  username: string;
}

export const CustomPage = () => {
  const profileQuery = useQuery<string, Error>(["profile"], () => {
    return fetch(`${process.env.REACT_APP_API_URL ?? ""}/creators/profile_get`)
      .then((res) => res.json())
      .then((data: ProfileData) => data.username);
  });

  return (
    <PageLayout>
      <ImageArray creatorId={profileQuery.data ?? ""} showItemBar={true} />
    </PageLayout>
  );
};
