import * as React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(27, 42, 74, 0.72)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(184, 196, 206, 0.12)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 'lg',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: 'text.primary' }}
            >
              My Portfolio
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 } }}>
            {NAV_ITEMS.map((item) => (
              <Box
                key={item.path}
                component={NavLink}
                to={item.path}
                end={item.path === '/'}
                sx={{
                  textDecoration: 'none',
                  fontSize: { xs: '0.8rem', md: '0.95rem' },
                  fontWeight: 600,
                  color: 'text.secondary',
                  px: { xs: 1.5, md: 2.5 },
                  py: 1,
                  borderRadius: 999,
                  transition: 'color 0.2s ease, background-color 0.2s ease',
                  '&.active': {
                    color: 'background.default',
                    backgroundColor: 'accent.main',
                  },
                  '&:hover': {
                    color: 'accent.main',
                  },
                  '&.active:hover': {
                    color: 'background.default',
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
