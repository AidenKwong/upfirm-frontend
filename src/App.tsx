import React, { FC, useState, createContext } from "react";
import theme from "./theme";
import "./App.css";
import HomePage from "./components/HomePage";
import { ThemeProvider } from "@mui/material/styles";
import { login } from "./api/backend";

declare module "@mui/material/styles" {
  export interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const App: FC = () => {
  if (localStorage.getItem("upfirm_ac_token")) {
    (async () => {})();
  }

  const [account, setAccount] = useState(null);
  const AccountContext = createContext([account, setAccount]);

  return (
    <AccountContext.Provider value={[account, setAccount]}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <HomePage />
        </div>
      </ThemeProvider>
    </AccountContext.Provider>
  );
};

export default App;
