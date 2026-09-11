import { createTheme } from '@mui/material/styles';

/**
 * 컬러 팔레트 디자인 시스템 기반 MUI 테마
 * 출처: doc/포트폴리오/컬러 팔레트 디자인 시스템.md
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e1251b',
      light: '#ff4b3e',
      dark: '#a81810',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1b2a4a',
      contrastText: '#ffffff',
    },
    accent: {
      main: '#f2e205',
      hover: '#ffeb70',
    },
    background: {
      default: '#0e1830',
      paper: '#2e4258',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b8c4ce',
      disabled: '#8a96a3',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  spacing: 8,
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#f2e205',
          '&:hover': {
            color: '#ffeb70',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 10,
          paddingBottom: 10,
        },
        containedPrimary: {
          boxShadow: '0 8px 20px rgba(225, 37, 27, 0.35)',
          '&:hover': {
            boxShadow: '0 10px 26px rgba(255, 75, 62, 0.45)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(184, 196, 206, 0.12)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
