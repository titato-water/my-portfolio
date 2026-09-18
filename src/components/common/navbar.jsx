import * as React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useColorMode } from '../../hooks/use-color-mode.js';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

/**
 * Navbar 컴포넌트
 *
 * 사이트 상단 네비게이션 바. Home / About Me / Projects 탭을 제공한다.
 */
function Navbar() {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', px: { xs: 2, md: 6 }, py: 1 }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 'xl',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, letterSpacing: '-0.01em', color: 'text.primary' }}
          >
            My Portfolio
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 } }}>
            {NAV_ITEMS.map((item) => (
              <Box
                key={item.path}
                component={NavLink}
                to={item.path}
                end={item.path === '/'}
                sx={{
                  textDecoration: 'none',
                  fontSize: { xs: '0.75rem', md: '0.85rem' },
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'text.disabled',
                  py: 2,
                  borderBottom: '2px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  '&.active': {
                    color: 'text.primary',
                    borderColor: 'accent.main',
                  },
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
            <IconButton
              onClick={toggleColorMode}
              aria-label="라이트/다크 모드 전환"
              sx={{
                color: 'text.disabled',
                '&:hover': { color: 'accent.main' },
              }}
            >
              {mode === 'dark' ? (
                <LightModeRoundedIcon fontSize="small" />
              ) : (
                <DarkModeRoundedIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
