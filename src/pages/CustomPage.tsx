import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const profileQuery = useQuery<ProfileData, Error>(
    ["profile"],
    () => {
      return fetch(
        `${
          process.env.REACT_APP_API_URL ?? ""
        }/creators/current_creator_profile`,
        {
          credentials: "include",
        }
      ).then((res) => res.json());
    },
    {
      onSuccess: (data) => {
        if (data.name === "Not Login") {
          navigate("/about");
        }
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
        navigate("/about");
      },
    }
  );

  return (
    <PageLayout>
      <ImageArray
        creatorId={profileQuery.data?.username ?? ""}
        showItemBar={true}
      />
    </PageLayout>
  );
};
