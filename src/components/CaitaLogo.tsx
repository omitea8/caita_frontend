import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  size: "h6" | "h5" | "h4" | "h3" | "h2" | "h1";
  navigatePage?: string;
}

export const CaitaLogo: React.FC<Props> = ({ size, navigatePage }) => {
  const navigate = useNavigate();

  return (
    <>
      <Typography
        variant={size}
        onClick={() => navigatePage && navigate(navigatePage)}
        sx={{
          cursor: navigatePage ? "pointer" : "default",
          fontFamily: "Sacramento",
        }}
      >
        caita
      </Typography>
    </>
  );
};
