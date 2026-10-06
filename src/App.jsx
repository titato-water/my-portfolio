import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navbar from './components/common/navbar.jsx';
import Footer from './components/common/footer.jsx';
import ScrollToTop from './components/common/scroll-to-top.jsx';
import Home from './pages/home.jsx';
import NotFound from './pages/not-found.jsx';
import createAppTheme from './theme.js';
import { ColorModeContext, useColorModeState } from './hooks/use-color-mode.js';
import PortfolioProvider from './contexts/portfolio-provider.jsx';

/* 첫 화면(Home)에 필요 없는 페이지는 방문할 때 불러와 첫 로딩 용량을 줄인다. */
const AboutMe = React.lazy(() => import('./pages/about-me.jsx'));
const Projects = React.lazy(() => import('./pages/projects.jsx'));

/** 페이지 코드를 불러오는 동안 화면 높이를 유지해 푸터가 튀어 오르지 않게 하는 자리 표시 */
const PAGE_FALLBACK = <Box component="main" sx={{ flexGrow: 1, minHeight: '60vh' }} />;

function App() {
  const { mode, toggleColorMode } = useColorModeState();
  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PortfolioProvider>
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
              <ScrollToTop />
              <Navbar />
              <React.Suspense fallback={PAGE_FALLBACK}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<AboutMe />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </React.Suspense>
              <Footer />
            </Box>
          </HashRouter>
        </PortfolioProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
