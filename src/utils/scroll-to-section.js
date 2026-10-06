/**
 * 섹션으로 스크롤할 때 고정 헤더에 제목이 가려지지 않게 하는 여백.
 * (모바일 헤더 61px, 그 이상 약 70px) 각 섹션의 scrollMarginTop에 사용한다.
 */
export const SECTION_SCROLL_MARGIN = { xs: '61px', sm: '70px' };

/** 모션 줄이기 설정이면 즉시, 아니면 부드럽게 이동하도록 scroll behavior 값을 고른다. */
function getScrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

/**
 * 페이지 맨 위로 부드럽게 스크롤한다. 모션 줄이기 설정에서는 즉시 이동한다.
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: getScrollBehavior() });
}

/**
 * 지정한 id의 섹션으로 부드럽게 스크롤한다.
 * HashRouter를 쓰므로 #앵커 대신 scrollIntoView를 사용하고, 모션 줄이기 설정에서는 즉시 이동한다.
 * 첫 섹션('hero')은 헤더 아래가 아니라 페이지 맨 위(0)로 이동한다.
 *
 * @param {string} sectionId - 이동할 요소의 id (예: 'contact')
 * @returns {boolean} 대상 요소를 찾아 이동했으면 true
 */
export function scrollToSection(sectionId) {
  if (sectionId === 'hero') {
    scrollToTop();
    return true;
  }

  const target = document.getElementById(sectionId);
  if (!target) return false;

  target.scrollIntoView({ behavior: getScrollBehavior() });
  return true;
}
