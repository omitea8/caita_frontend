import { useMutation } from "@tanstack/react-query";

interface AuthResponse {
  url: string;
}

export const Login = () => {
  const redirectToAuthMutation = useMutation(
    () => {
      return fetch("/creators/login", {
        method: "GET",
      });
    },
    {
      onSuccess: async (response) => {
        window.location.href = ((await response.json()) as AuthResponse).url;
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
