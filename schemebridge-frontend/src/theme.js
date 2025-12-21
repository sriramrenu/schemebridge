import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8e2de2"
    },
    secondary: {
      main: "#4a00e0"
    },
    background: {
      default: "#0f0c29",
      paper: "#1b1b3a"
    }
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 700
    }
  }
});

export default theme;
