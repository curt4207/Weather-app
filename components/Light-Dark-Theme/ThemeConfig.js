import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    body: "#6AAED9",
    text: "#363537",
    toggleBorder: "#fff",
    background: "#363537"
};

export const darkTheme = {
    body: "#262473",
    text: "#fafafa",
    toggleBorder: "#6b8096",
    background: "#999",
};

export const GlobalStyles = createGlobalStyle`
body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear; 
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    font-size: 16px;
}
`
