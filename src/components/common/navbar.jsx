import * as React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useColorMode } from '../../hooks/use-color-mode.js';
import { scrollToSection } from '../../utils/scroll-to-section.js';

/** shortLabel: 좁은 화면(xs)에서 한 줄에 들어가도록 줄인 이름 */
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', shortLabel: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

/** 터치 대상의 최소 크기(px) */
const TOUCH_TARGET = 44;

/** 메뉴 항목의 공통 스타일 (NavLink와 Contact 버튼이 함께 사용) */
const navItemSx = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: TOUCH_TARGET,
  minHeight: TOUCH_TARGET,
  px: { xs: 0.5, sm: 0.75, md: 1.5 },
  textDecoration: 'none',
  fontSize: { xs: '0.75rem', md: '0.85rem' },
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  color: 'text.disabled',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '2px solid transparent',
  borderRadius: 0,
  cursor: 'pointer',
  font: 'inherit',
  transition: 'color 0.2s ease, border-color 0.2s ease',
  '&:hover': { color: 'text.primary' },
};

/**
 * Navbar 컴포넌트
 *
 * 사이트 상단 네비게이션 바. Home / About Me / Projects 탭과 Contact(홈의 Contact 섹션으로 스크롤) 메뉴를 제공한다.
 * Contact는 다른 페이지에서 누르면 홈으로 이동한 뒤 스크롤한다. (state.scrollTo를 홈이 처리)
 * 모든 메뉴와 테마 버튼은 44px 이상의 터치 영역을 가진다.
 */
function Navbar() {
  const { mode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactClick = () => {
    if (location.pathname === '/') {
      scrollToSection('contact');
      return;
    }
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, pl: { xs: 0.5, md: 0 } }}>
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
                /* 폰 폭에서는 로고 글자를 숨겨 헤더가 두 줄로 늘어나지 않게 한다. */
                display: { xs: 'none', sm: 'block' },
                whiteSpace: 'nowrap',
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'text.primary',
              }}
            >
              My Portfolio
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, md: 1 } }}>
            {NAV_ITEMS.map((item) => (
              <Box
                key={item.path}
                component={NavLink}
                to={item.path}
                end={item.path === '/'}
                aria-label={item.label}
                sx={{
                  ...navItemSx,
                  '&.active': {
                    color: 'text.primary',
                    borderColor: 'accent.main',
                  },
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {item.shortLabel ? (
                  <>
                    <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                      {item.shortLabel}
                    </Box>
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                      {item.label}
                    </Box>
                  </>
                ) : (
                  item.label
                )}
              </Box>
            ))}
            <Box component="button" type="button" onClick={handleContactClick} sx={navItemSx}>
              Contact
            </Box>
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
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
