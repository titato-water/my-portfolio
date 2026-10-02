/**
 * 지정한 id의 섹션으로 부드럽게 스크롤한다.
 * HashRouter를 쓰므로 #앵커 대신 scrollIntoView를 사용하고, 모션 줄이기 설정에서는 즉시 이동한다.
 *
 * @param {string} sectionId - 이동할 요소의 id (예: 'contact')
 * @returns {boolean} 대상 요소를 찾아 이동했으면 true
 */
export function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return false;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
  return true;
}
