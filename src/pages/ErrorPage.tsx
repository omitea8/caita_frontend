import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";

export const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return (
    <PageLayout>
      <h1>Error!</h1>
      {isRouteErrorResponse(error) && <i>{error.statusText}</i>}
    </PageLayout>
  );
};
