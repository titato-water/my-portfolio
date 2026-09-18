import * as React from 'react';

const STORAGE_KEY = 'color-mode';

export const ColorModeContext = React.createContext({
  mode: 'dark',
  toggleColorMode: () => {},
});

function getInitialMode() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage를 사용할 수 없는 환경에서는 기본값을 사용한다.
  }
  return 'dark';
}

/**
 * useColorModeState 훅
 *
 * 다크/라이트 모드 상태를 관리하고 localStorage에 저장한다.
 * ThemeProvider와 ColorModeContext.Provider에 넘길 값을 반환한다.
 */
export function useColorModeState() {
  const [mode, setMode] = React.useState(getInitialMode);

  const toggleColorMode = React.useCallback(() => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // 저장 실패는 무시한다 (모드 전환 자체는 계속 동작).
      }
      return next;
    });
  }, []);

  return { mode, toggleColorMode };
}

/**
 * useColorMode 훅
 *
 * ColorModeContext에서 현재 모드와 토글 함수를 읽어온다.
 *
 * Example usage:
 * const { mode, toggleColorMode } = useColorMode();
 */
export function useColorMode() {
  return React.useContext(ColorModeContext);
}
