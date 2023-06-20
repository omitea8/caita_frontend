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
  const profileQuery = useQuery<ProfileData, Error>(["profile"], () => {
    return fetch(
      `${process.env.REACT_APP_API_URL ?? ""}/creators/current_creator_profile`,
      {
        credentials: "include",
      }
    ).then((res) => res.json());
  });

  return (
    <PageLayout>
      <ImageArray
        creatorId={profileQuery.data?.username ?? ""}
        showItemBar={true}
      />
    </PageLayout>
  );
};
