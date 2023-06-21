import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { ImageArray } from "../components/ImageArray";
import { useQuery } from "@tanstack/react-query";
import { Box, Grid, Typography } from "@mui/material";

interface CreatorData {
  twitter_profile_image: string;
  twitter_name: string;
  twitter_description: string;
}

export const CreatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { creatorId } = useParams();

  const creatorQuery = useQuery<
    {
      iconUrl: string;
      name: string;
      description: string;
    },
    Error
  >(
    ["creator", creatorId],
    () => {
      return fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/creators/${creatorId ?? ""}`
      ).then((response) => {
        return response.json().then((data: CreatorData) => {
          return {
            iconUrl: data.twitter_profile_image,
            name: data.twitter_name,
            description: data.twitter_description,
          };
        });
      });
    },
    { enabled: creatorId !== undefined }
  );

  return (
    <PageLayout>
      <Box sx={{ maxWidth: 780, width: "100%", display: "flex" }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <img
              src={creatorQuery.data?.iconUrl.replace("normal", "200x200")}
              alt="icon"
              width={100}
            />
          </Grid>
          <Grid item sx={{ width: 680 }}>
            <Typography variant="h5" component="div">
              {creatorQuery.data?.name}
            </Typography>
            <Typography variant="body2" component="div">
              {creatorQuery.data?.description}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <ImageArray
        creatorId={creatorId ?? ""}
        onClick={(imageId: string) => {
          navigate(`/images/${imageId}`);
        }}
        showItemBar={false}
      />
    </PageLayout>
  );
};
