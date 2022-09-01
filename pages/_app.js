import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme, GlobalStyles } from "../components/Light-Dark-Theme/ThemeConfig";
import { getTabId } from "@mui/base";
import styled from "styled-components";

const ThemeButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em;
  border: 2px solid;
  cursor: pointer;
`;

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <ThemeButton type="submit" onClick={toggleTheme}>
        {" "}
        Switch theme
      </ThemeButton>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
