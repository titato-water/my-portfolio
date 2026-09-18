import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navbar from './components/common/navbar.jsx';
import Home from './pages/home.jsx';
import AboutMe from './pages/about-me.jsx';
import Projects from './pages/projects.jsx';
import createAppTheme from './theme.js';
import { ColorModeContext, useColorModeState } from './hooks/use-color-mode.js';

function App() {
  const { mode, toggleColorMode } = useColorModeState();
  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <Box
            sx={{
              width: '100%',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.default',
            }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Box>
        </HashRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
