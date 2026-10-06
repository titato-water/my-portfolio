/**
 * 메뉴 항목 정의 (데스크톱 메뉴와 모바일 사이드 메뉴가 함께 사용)
 *
 * - path: 홈이 아닌 곳에서 눌렀을 때 이동할 페이지
 * - sectionId: 홈에서 눌렀을 때 부드럽게 스크롤할 섹션 id
 * - isPage: 별도 페이지가 있는 항목. 모바일 사이드 메뉴에서는 홈에서도 섹션 스크롤 대신 이 페이지로 이동한다.
 * - scrollState: 홈으로 이동한 뒤 스크롤할 섹션을 알려주는 라우터 state (Contact처럼 별도 페이지가 없는 항목)
 */
export const NAV_ITEMS = [
  { key: 'home', label: 'Home', path: '/', sectionId: 'hero' },
  { key: 'about', label: 'About Me', path: '/about', sectionId: 'about', isPage: true },
  { key: 'projects', label: 'Projects', path: '/projects', sectionId: 'projects', isPage: true },
  {
    key: 'contact',
    label: 'Contact',
    path: '/',
    sectionId: 'contact',
    scrollState: { scrollTo: 'contact' },
  },
];

/** 홈에서 스크롤 위치를 추적할 섹션 id (위에서 아래 순서) */
export const SPY_SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'contact'];

/** 섹션 id가 어느 메뉴 항목에 속하는지 (Skill Tree는 About Me에 속한다) */
export const SECTION_TO_NAV_KEY = {
  hero: 'home',
  about: 'about',
  skills: 'about',
  projects: 'projects',
  contact: 'contact',
};

/** 페이지 경로가 어느 메뉴 항목에 속하는지 (홈은 스크롤 위치로 따로 결정) */
export const PATH_TO_NAV_KEY = {
  '/about': 'about',
  '/projects': 'projects',
};
