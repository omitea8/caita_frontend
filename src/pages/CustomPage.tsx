import { ImageArray } from "../components/ImageArray";
import { PageLayout } from "../components/PageLayout";
import { useLoginCreator } from "./useLoginCreator";

export const CustomPage = () => {
  const loginCreator = useLoginCreator();

  return (
    <PageLayout>
      <ImageArray creatorId={loginCreator?.username ?? ""} showItemBar={true} />
    </PageLayout>
  );
};
