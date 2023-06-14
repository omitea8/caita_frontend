import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const GetState = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // stateとcodeをバックエンドに送る
    const sendData = {
      state: searchParams.get("state"),
      code: searchParams.get("code"),
    };
    fetch(`${process.env.REACT_APP_API_URL ?? ""}/creators/token_get`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    })
      // トークンリクエストの結果を取得する
      .then((response) => response.json() as Promise<{ message: string }>)
      .then((data) => {
        if (data.message === "OK") {
          toast.success("loginしました");
          navigate("/custom");
        } else {
          toast.error("loginに失敗しました");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchParams, navigate]);
  return (
    <>
      <p>caita redirect</p>
    </>
  );
};
