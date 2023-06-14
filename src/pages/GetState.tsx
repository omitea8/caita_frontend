import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export const GetState = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const state = searchParams.get("state");
  const code = searchParams.get("code");

  useQuery(
    ["token"],
    () => {
      const sendData = {
        state: state,
        code: code,
      };
      return fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/creators/token_get`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendData),
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          toast.success("loginしました");
          navigate("/custom");
        } else {
          toast.error("loginに失敗しました");
        }
      },
      enabled: !(state === null || code === null),
    }
  );

  return (
    <>
      <p>caita redirect</p>
    </>
  );
};
