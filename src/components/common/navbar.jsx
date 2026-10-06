import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import HamburgerButton from './hamburger-button.jsx';
import MobileMenu from './mobile-menu.jsx';
import ReadingProgressBar from './reading-progress-bar.jsx';
import useActiveSection from '../../hooks/use-active-section.js';
import { useColorMode } from '../../hooks/use-color-mode.js';
import useScrollNavigation from '../../hooks/use-scroll-navigation.js';
import {
  NAV_ITEMS,
  PATH_TO_NAV_KEY,
  SECTION_TO_NAV_KEY,
  SPY_SECTION_IDS,
} from '../../utils/nav-items.js';
import { scrollToSection } from '../../utils/scroll-to-section.js';

/** 이 폭(px) 이하에서는 인라인 메뉴 대신 햄버거 버튼과 사이드 메뉴를 쓴다. */
const MOBILE_QUERY = '(max-width:767px)';

/** 터치 대상의 최소 크기(px) */
const TOUCH_TARGET = 44;

/** 사이드 메뉴가 닫히는 애니메이션(약 225ms)이 끝나길 기다리는 시간(ms) */
const MENU_CLOSE_DELAY_MS = 300;

/** 모바일 사이드 메뉴 요소의 id (햄버거 버튼의 aria-controls와 맞춘다) */
const MOBILE_MENU_ID = 'mobile-menu';

/** 데스크톱 메뉴 항목의 공통 스타일 */
const navItemSx = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: TOUCH_TARGET,
  minHeight: TOUCH_TARGET,
  px: { sm: 0.75, md: 1.5 },
  textDecoration: 'none',
  fontSize: { xs: '0.75rem', md: '0.85rem' },
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  color: 'text.disabled',
  borderBottom: '2px solid transparent',
  transition: 'color 0.2s ease, border-color 0.2s ease',
  '&:hover': { color: 'text.primary' },
  '&[aria-current="true"]': {
    color: 'text.primary',
    borderColor: 'accent.main',
  },
};

/**
 * Navbar 컴포넌트
 *
 * 스크롤에 반응하는 상단 네비게이션.
 * - 스크롤 헤더: **모바일에서만** 아래로 스크롤하면 숨기고 위로 스크롤하면 다시 보여준다.
 *   (transform 사용, 맨 위/메뉴 열림/키보드 포커스 시에는 항상 표시) 데스크톱에서는 항상 보인다.
 * - 읽기 진행률: 화면 맨 위 고정 바 (ReadingProgressBar)
 * - 스크롤 스파이: 홈에서는 IntersectionObserver로 현재 보고 있는 섹션의 메뉴가 활성화된다.
 * - 데스크톱 메뉴 이동: 홈에서는 해당 섹션으로 부드럽게 스크롤하고, 다른 페이지에서는 페이지로 이동한다.
 *   (Contact는 별도 페이지가 없어 홈으로 이동한 뒤 스크롤한다.)
 * - 모바일(767px 이하): 햄버거 버튼과 오른쪽 사이드 메뉴.
 *   사이드 메뉴에서는 About Me/Projects가 홈에서도 섹션 스크롤 대신 해당 페이지로 이동한다.
 * - 로고: 홈으로 가는 링크. 홈에서는 맨 위로 스크롤하고, 다른 페이지에서는 홈으로 이동한다.
 */
function Navbar() {
  const { mode, toggleColorMode } = useColorMode();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isHome = pathname === '/';

  /* 메뉴를 연 경로를 기억해, 경로가 바뀌면(뒤로 가기 등) 별도 처리 없이 자동으로 닫힌 상태가 된다. */
  const [menuOpenPath, setMenuOpenPath] = React.useState(null);
  const isMenuOpen = isMobile && menuOpenPath === pathname;

  /* 헤더는 모바일에서만 스크롤에 따라 숨긴다. 데스크톱(태블릿 포함)에서는 항상 보인다. */
  const { isHidden, progressBarRef, revealHeader } = useScrollNavigation(isMenuOpen || !isMobile);
  const activeSectionId = useActiveSection(SPY_SECTION_IDS, isHome);

  const activeKey = isHome
    ? (SECTION_TO_NAV_KEY[activeSectionId] ?? 'home')
    : (PATH_TO_NAV_KEY[pathname] ?? null);

  const handleItemClick = (event, item) => {
    const wasMenuOpen = isMenuOpen;
    setMenuOpenPath(null);

    /* 모바일 사이드 메뉴에서는 별도 페이지가 있는 항목(About Me, Projects)을 섹션 스크롤이 아니라 페이지 이동으로 처리한다. */
    const opensPage = isMobile && item.isPage;

    if (isHome && item.sectionId && !opensPage) {
      event.preventDefault();
      if (wasMenuOpen) {
        /* 사이드 메뉴가 닫히며 스크롤 잠금이 풀릴 때 부드러운 스크롤이 끊기지 않도록, 메뉴가 닫힌 뒤에 이동한다. */
        setTimeout(() => scrollToSection(item.sectionId), MENU_CLOSE_DELAY_MS);
      } else {
        scrollToSection(item.sectionId);
      }
    }
  };

  /* 로고: 홈에서는 맨 위로 스크롤하고, 다른 페이지에서는 홈으로 이동한다. (홈 메뉴와 같은 동작) */
  const handleLogoClick = (event) => {
    const wasMenuOpen = isMenuOpen;
    setMenuOpenPath(null);

    if (isHome) {
      event.preventDefault();
      if (wasMenuOpen) {
        setTimeout(() => scrollToSection('hero'), MENU_CLOSE_DELAY_MS);
      } else {
        scrollToSection('hero');
      }
    }
  };

  const colorModeButton = (
    <IconButton
      onClick={toggleColorMode}
      aria-label="라이트/다크 모드 전환"
      sx={{
        width: TOUCH_TARGET,
        height: TOUCH_TARGET,
        color: 'text.disabled',
        '&:hover': { color: 'accent.text' },
      }}
    >
      {mode === 'dark' ? (
        <LightModeRoundedIcon fontSize="small" />
      ) : (
        <DarkModeRoundedIcon fontSize="small" />
      )}
    </IconButton>
  );

  return (
    <>
      <ReadingProgressBar barRef={progressBarRef} />
      <AppBar
        position="sticky"
        elevation={0}
        onFocus={revealHeader}
        sx={(theme) => ({
          /* 사이드 메뉴(Drawer) 위에 있어야 같은 버튼으로 메뉴를 닫을 수 있다. */
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider',
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s ease',
          willChange: 'transform',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        })}
      >
        <Toolbar sx={{ justifyContent: 'center', px: { xs: 1.5, md: 6 }, py: 1 }}>
          <Box
            component="nav"
            aria-label="주요 메뉴"
            sx={{
              width: '100%',
              maxWidth: 'xl',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              component={RouterLink}
              to="/"
              onClick={handleLogoClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                minHeight: TOUCH_TARGET,
                pl: { xs: 0.5, md: 0 },
                color: 'text.primary',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'accent.text' },
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '2px',
                  backgroundColor: 'accent.main',
                }}
              />
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'inherit',
                }}
              >
                My Portfolio
              </Typography>
            </Box>
            {isMobile ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {colorModeButton}
                <HamburgerButton
                  isOpen={isMenuOpen}
                  onClick={() => setMenuOpenPath((prev) => (prev === pathname ? null : pathname))}
                  controlsId={MOBILE_MENU_ID}
                />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { sm: 0, md: 1 } }}>
                {NAV_ITEMS.map((item) => (
                  <Box
                    key={item.key}
                    component={RouterLink}
                    to={item.path}
                    state={item.scrollState}
                    onClick={(event) => handleItemClick(event, item)}
                    aria-current={item.key === activeKey ? 'true' : undefined}
                    sx={navItemSx}
                  >
                    {item.label}
                  </Box>
                ))}
                {colorModeButton}
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {isMobile && (
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setMenuOpenPath(null)}
          activeKey={activeKey}
          onItemClick={handleItemClick}
          menuId={MOBILE_MENU_ID}
        />
      )}
    </>
  );
}

export default Navbar;
