import { createTheme } from '@mui/material/styles';

/**
 * 컬러 팔레트 디자인 시스템 기반 MUI 테마 (볼드 & 에디토리얼 스타일)
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
    divider: 'rgba(184, 196, 206, 0.16)',
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    overline: {
      fontWeight: 700,
      letterSpacing: '0.2em',
      lineHeight: 1.6,
    },
  },
  spacing: 8,
});

export default theme;
