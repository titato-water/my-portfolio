import * as React from 'react';

const RESET_DELAY_MS = 2000;

/**
 * useCopyToClipboard 훅
 *
 * 텍스트를 클립보드에 복사하고, 복사 직후 일정 시간 동안 isCopied를 true로 유지한다.
 * 클립보드 API를 쓸 수 없는 환경에서는 조용히 무시한다.
 *
 * @returns {{ isCopied: boolean, copy: (text: string) => Promise<void> }}
 *
 * Example usage:
 * const { isCopied, copy } = useCopyToClipboard();
 * <button onClick={() => copy('hello')}>{isCopied ? '복사됨' : '복사'}</button>
 */
function useCopyToClipboard() {
  const [isCopied, setIsCopied] = React.useState(false);
  const timerRef = React.useRef(null);

  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = React.useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsCopied(false), RESET_DELAY_MS);
    } catch {
      // 클립보드 API를 사용할 수 없는 환경에서는 조용히 무시한다.
    }
  }, []);

  return { isCopied, copy };
}

export default useCopyToClipboard;
