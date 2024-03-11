import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { Theme } from "@mui/material";

const theme : Theme = createTheme({
  palette: {
    // palette documentation https://mui.com/material-ui/customization/palette/
    primary: {
      main: "#85F668",
    },
    secondary: {
      main: "#46BCFF",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
