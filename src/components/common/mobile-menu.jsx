import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import { GITHUB_URL } from '../../utils/contact-info.js';
import { NAV_ITEMS } from '../../utils/nav-items.js';

/** 헤더 높이(모바일). 사이드 메뉴가 헤더 아래에서 시작하도록 위쪽 여백으로 쓴다. */
const HEADER_HEIGHT = 61;

/**
 * MobileMenu 컴포넌트
 *
 * 모바일에서 오른쪽에서 밀려 나오는 사이드 메뉴.
 * 헤더(햄버거 버튼)는 사이드 메뉴 위에 그대로 보이므로 같은 버튼으로 닫을 수 있다.
 * MUI Drawer가 포커스 가두기, Esc로 닫기, 배경 스크롤 잠금, 바깥 영역 클릭 닫기를 처리한다.
 *
 * Props:
 * @param {boolean} isOpen - 메뉴가 열려 있는지 여부 [Required]
 * @param {function} onClose - 메뉴를 닫을 때 호출 [Required]
 * @param {string} activeKey - 현재 활성 메뉴 항목의 key [Optional]
 * @param {function} onItemClick - (event, item) 메뉴 항목을 눌렀을 때 호출 [Required]
 * @param {string} menuId - 메뉴 요소의 id (햄버거 버튼의 aria-controls와 맞춘다) [Required]
 *
 * Example usage:
 * <MobileMenu isOpen={isOpen} onClose={close} activeKey="home" onItemClick={handleClick} menuId="mobile-menu" />
 */
function MobileMenu({ isOpen, onClose, activeKey, onItemClick, menuId }) {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={(theme) => ({ zIndex: theme.zIndex.drawer })}
      slotProps={{
        paper: {
          sx: {
            width: 'min(86vw, 320px)',
            pt: `${HEADER_HEIGHT}px`,
            backgroundColor: 'background.default',
            backgroundImage: 'none',
            borderLeft: '1px solid',
            borderColor: 'divider',
          },
        },
      }}
    >
      <Box
        component="nav"
        id={menuId}
        aria-label="모바일 메뉴"
        sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 2 }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeKey;

          return (
            <Box
              key={item.key}
              component={RouterLink}
              to={item.path}
              state={item.scrollState}
              onClick={(event) => onItemClick(event, item)}
              aria-current={isActive ? 'true' : undefined}
              sx={{
                display: 'flex',
                alignItems: 'center',
                minHeight: 56,
                px: 2,
                borderRadius: 1,
                textDecoration: 'none',
                fontSize: '1.15rem',
                fontWeight: isActive ? 800 : 600,
                letterSpacing: '0.04em',
                color: isActive ? 'accent.text' : 'text.primary',
                backgroundColor: isActive ? 'action.hover' : 'transparent',
                transition: 'color 0.2s ease, background-color 0.2s ease',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              {item.label}
            </Box>
          );
        })}
      </Box>
      <Box sx={{ p: 2, pt: 0 }}>
        <Box
          component="a"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub (새 탭에서 열기)"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            minHeight: 56,
            px: 2,
            borderRadius: 1,
            textDecoration: 'none',
            color: 'text.secondary',
            '&:hover': { backgroundColor: 'action.hover', color: 'accent.text' },
          }}
        >
          <GitHubIcon fontSize="small" />
          <Typography sx={{ fontWeight: 600 }}>GitHub</Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

export default MobileMenu;
