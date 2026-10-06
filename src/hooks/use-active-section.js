import * as React from 'react';

/**
 * 화면 세로 45~46% 부근의 가는 띠. 이 띠에 걸친 섹션을 "지금 보고 있는 섹션"으로 본다.
 * (위 45%, 아래 54%를 잘라낸 나머지 1% 구간)
 */
const OBSERVER_ROOT_MARGIN = '-45% 0px -54% 0px';

/**
 * useActiveSection 훅
 *
 * IntersectionObserver로 각 섹션이 화면 가운데 띠에 들어오는지 감시해, 현재 보고 있는 섹션 id를 돌려준다.
 * (스크롤 이벤트를 직접 계산하지 않으므로 가볍다.)
 *
 * @param {string[]} sectionIds - 감시할 섹션 id 목록 (렌더링마다 새로 만들지 말고 상수로 전달) [Required]
 * @param {boolean} isEnabled - false면 감시하지 않는다 (예: 홈이 아닌 페이지) [Optional, 기본값: true]
 * @returns {string} 현재 활성 섹션 id (처음에는 첫 번째 id)
 *
 * Example usage:
 * const activeId = useActiveSection(['hero', 'about'], pathname === '/');
 */
function useActiveSection(sectionIds, isEnabled = true) {
  const [activeId, setActiveId] = React.useState(sectionIds[0]);

  React.useEffect(() => {
    if (!isEnabled || typeof IntersectionObserver === 'undefined') return undefined;

    const elements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: OBSERVER_ROOT_MARGIN, threshold: 0 },
    );
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds, isEnabled]);

  return activeId;
}

export default useActiveSection;
