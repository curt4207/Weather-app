import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { lightTheme, darkTheme, GlobalStyles } from '../components/Light-Dark-Theme/ThemeConfig';
import { getTabId } from '@mui/base';



function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  
  const toggleTheme = () => {
  theme == "light" ? setTheme("dark") : setTheme("light")
}

  return(
  <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
    <GlobalStyles />
    <button type= "submit" onClick={toggleTheme}> Switch theme</button>
  <Component {...pageProps} />
  </ThemeProvider>
  )
}

export default MyApp
