import * as React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop 컴포넌트
 *
 * 페이지(경로)가 바뀌면 스크롤을 맨 위로 되돌린다. HashRouter는 이 동작을 자동으로 하지 않아서,
 * 스크롤이 내려간 상태에서 다른 페이지로 이동하면 중간부터 보이는 문제가 있었다.
 * 홈의 특정 섹션으로 가는 이동(location.state.scrollTo)은 해당 섹션이 처리하므로 건드리지 않는다.
 * 화면에는 아무것도 그리지 않는다.
 *
 * 주의: 경로가 바뀔 때만 실행해야 한다. state만 바뀌는 경우(홈이 스크롤한 뒤 state를 비우는 경우)에
 * 다시 실행되면 방금 이동한 섹션에서 맨 위로 되돌아가 버린다.
 */
function ScrollToTop() {
  const { pathname, state } = useLocation();

  React.useEffect(() => {
    if (state?.scrollTo) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // 경로가 바뀔 때만 실행한다. (state는 그 순간의 값만 필요하다)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

export default ScrollToTop;
