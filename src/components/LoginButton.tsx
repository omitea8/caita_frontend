import { useMutation } from "@tanstack/react-query";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";

export const LoginButton = () => {
  const redirectToAuthMutation = useMutation(
    () => {
      return fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/creators/login_url`,
        {
          method: "GET",
          credentials: "include",
        }
      );
    },
    {
      onSuccess: async (response) => {
        window.location.href = ((await response.json()) as { url: string }).url;
      },
    }
  );

  return (
    <>
      <Button
        variant="contained"
        startIcon={<TwitterIcon />}
        onClick={() => {
          redirectToAuthMutation.mutate();
        }}
      >
        ログインする
      </Button>
    </>
  );
};
