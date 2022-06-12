import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#337def",
    },
    secondary: {
      main: "#fcc729",
    },
  },
});

export default theme = responsiveFontSizes(theme);
