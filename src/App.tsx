import React, { FC } from "react";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import HomePage from "./components/HomePage";

declare module "@mui/material/styles" {
  export interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: "#337def"
    },
    secondary: {
      main: "#fcc729"
    }
  }
});

theme = responsiveFontSizes(theme);

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HomePage />
      </div>
    </ThemeProvider>
  );
};

export default App;
