import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const GetState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // stateとcodeをバックエンドに送る
    const sendData = {
      state: searchParams.get("state"),
      code: searchParams.get("code"),
    };
    fetch("/users/getToken", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    })
      // トークンリクエストの結果を取得する
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "OK") {
          toast.success("login OK");
        } else {
          toast.error("login failed");
        }
      });
  }, [searchParams]);
  return (
    <>
      <p>caita redirect</p>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
