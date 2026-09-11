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
        backgroundColor: 'secondary.main',
        borderBottom: '1px solid',
        borderColor: 'background.paper',
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
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: 'text.primary' }}
          >
            My Portfolio
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 3 } }}>
            {NAV_ITEMS.map((item) => (
              <Box
                key={item.path}
                component={NavLink}
                to={item.path}
                end={item.path === '/'}
                sx={{
                  textDecoration: 'none',
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  fontWeight: 500,
                  color: 'text.secondary',
                  py: 1,
                  borderBottom: '2px solid transparent',
                  '&.active': {
                    color: 'accent.main',
                    borderColor: 'accent.main',
                  },
                  '&:hover': {
                    color: 'accent.hover',
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
