import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  profile_image_url: string;
  name: string;
  description: string;
  username: string;
}

export const useLoginCreator = () => {
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
          toast.error("ログインしてください");
          navigate("/about");
        }
      },
      onError: (error) => {
        toast.error("ログインしてください");
        navigate("/about");
      },
    }
  );

  return profileQuery.data;
};
