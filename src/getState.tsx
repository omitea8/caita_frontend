import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function GetState() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sendData = {
      state: searchParams.get("state"),
      code: searchParams.get("code"),
    };
    fetch("/users/getToken", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });
  }, [searchParams]);
  return (
    <>
      <p>caita redirect</p>
    </>
  );
}
