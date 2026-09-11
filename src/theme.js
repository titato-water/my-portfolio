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
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
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
  },
});

export default theme;
