import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from './components/common/navbar.jsx';
import Home from './pages/home.jsx';
import AboutMe from './pages/about-me.jsx';
import Projects from './pages/projects.jsx';

function App() {
  return (
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
  );
}

export default App;
