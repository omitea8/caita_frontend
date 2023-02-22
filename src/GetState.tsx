import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const GetState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // stateとcodeをバックエンドに送る
    const sendData = {
      state: searchParams.get("state"),
      code: searchParams.get("code"),
    };
    fetch("/creators/gettoken", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    })
      // トークンリクエストの結果を取得する
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "OK") {
          toast.success("loginしました");
          navigate("/MyPage");
        } else {
          toast.error("loginに失敗しました");
        }
      });
  }, [searchParams]);
  return (
    <>
      <p>caita redirect</p>
    </>
  );
};
