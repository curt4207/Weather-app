import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { lightTheme, darkTheme, GlobalStyles } from '../components/Light-Dark-Theme/ThemeConfig';

function MyApp({ Component, pageProps  }) {
  const [theme, setTheme] = useState("light");
  
  return(
    <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Component {...pageProps} setTheme={setTheme} theme={theme}/>
    </ThemeProvider>
  )
};

export default MyApp;
