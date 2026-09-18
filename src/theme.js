import { createTheme } from '@mui/material/styles';

const MODE_PALETTES = {
  dark: {
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
      disabled: '#7a7a7a',
    },
    divider: 'rgba(255, 255, 255, 0.16)',
  },
  light: {
    background: {
      default: '#f0f0ee',
      paper: '#e4e4e2',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#54534f',
      disabled: '#8a8985',
    },
    divider: 'rgba(0, 0, 0, 0.14)',
  },
};

/**
 * 컬러 팔레트 디자인 시스템 기반 MUI 테마 (볼드 & 에디토리얼 스타일)
 * 출처: doc/포트폴리오/컬러 팔레트 디자인 시스템.md
 *
 * @param {'dark' | 'light'} mode - 팔레트 모드 [Required]
 */
function createAppTheme(mode) {
  const modePalette = MODE_PALETTES[mode] ?? MODE_PALETTES.dark;

  return createTheme({
    palette: {
      mode,
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
        main: '#e1251b',
        hover: '#ff4b3e',
      },
      ...modePalette,
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
}

export default createAppTheme;
