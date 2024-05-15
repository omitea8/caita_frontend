import { createTheme, darken, lighten } from "@mui/material/styles";

const primaryColor = "#000";

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: lighten(primaryColor, 0.5),
      dark: darken(primaryColor, 0.3),
      contrastText: "#fff",
    },
    secondary: {
      main: "#757575",
      light: "#9e9e9e",
      dark: "#616161",
      contrastText: "#fff",
    },
  },
});
