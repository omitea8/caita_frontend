import { useRouteError } from "react-router-dom";

export const ErrorPage: React.FC = () => {
  const error = useRouteError() as {
    statusText: string;
    message: string;
  };

  return (
    <div id="error-page">
      <h1>Error!</h1>
      <i>{error.statusText || error.message}</i>
    </div>
  );
};
