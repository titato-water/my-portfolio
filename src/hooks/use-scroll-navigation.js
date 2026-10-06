import * as React from 'react';

/** 이 위치(px)보다 위에서는 헤더를 항상 보여준다. */
const ALWAYS_SHOW_UNTIL = 80;

/** 이 값(px)보다 작은 스크롤 움직임은 방향 전환으로 보지 않는다. (떨림 방지) */
const MIN_SCROLL_DELTA = 8;

/**
 * useScrollNavigation 훅
 *
 * 스크롤 위치를 한 번만 감시해 두 가지를 만든다.
 * 1) 헤더 표시 여부: 아래로 스크롤하면 숨기고(isHidden), 위로 스크롤하면 다시 보여준다.
 * 2) 읽기 진행률: progressBarRef가 가리키는 요소를 transform(scaleX)으로 갱신한다.
 *    (상태가 아니라 ref로 직접 갱신하므로 스크롤 중 리렌더링이 없다.)
 *
 * 성능: 스크롤 이벤트는 passive로 등록하고 requestAnimationFrame으로 프레임당 한 번만 처리한다.
 * 페이지 높이가 바뀌는 경우(지연 로딩되는 섹션)는 ResizeObserver로 진행률을 다시 계산한다.
 *
 * @param {boolean} isLocked - true면 헤더를 숨기지 않는다 (예: 모바일 메뉴가 열려 있을 때) [Optional, 기본값: false]
 * @returns {{ isHidden: boolean, progressBarRef: React.RefObject, revealHeader: function }}
 *
 * Example usage:
 * const { isHidden, progressBarRef, revealHeader } = useScrollNavigation(isMenuOpen);
 */
function useScrollNavigation(isLocked = false) {
  const [isHidden, setIsHidden] = React.useState(false);
  const progressBarRef = React.useRef(null);

  React.useEffect(() => {
    let lastY = window.scrollY;
    let frameId = null;

    const update = () => {
      frameId = null;
      const currentY = window.scrollY;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, currentY / maxScroll)) : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      if (currentY <= ALWAYS_SHOW_UNTIL) {
        setIsHidden(false);
        lastY = currentY;
        return;
      }

      const delta = currentY - lastY;
      if (Math.abs(delta) < MIN_SCROLL_DELTA) return;

      setIsHidden(delta > 0);
      lastY = currentY;
    };

    const requestUpdate = () => {
      if (frameId === null) frameId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(document.body);
    update();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      resizeObserver.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  const revealHeader = React.useCallback(() => setIsHidden(false), []);

  return { isHidden: isHidden && !isLocked, progressBarRef, revealHeader };
}

export default useScrollNavigation;
