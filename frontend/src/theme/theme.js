import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366F1",
    },
    secondary: {
      main: "#8B5CF6",
    },
    background: {
      default: "#F4F6FA",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;