import { useMutation } from "@tanstack/react-query";

export const Login = () => {
  const redirectToAuthMutation = useMutation(
    () => {
      return fetch(`${process.env.REACT_APP_API_URL ?? ""}/creators/login`, {
        method: "GET",
      });
    },
    {
      onSuccess: async (response) => {
        window.location.href = ((await response.json()) as { url: string }).url;
      },
    }
  );

  return (
    <div>
      <p>caita</p>
      <button
        onClick={() => {
          redirectToAuthMutation.mutate();
        }}
      >
        login
      </button>
    </div>
  );
};
