import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

const BAR_WIDTH = 22;
const BAR_HEIGHT = 2;
const BAR_GAP = 6;

/** 막대 하나의 공통 스타일. 위/아래 막대는 열리면 X자로 겹쳐 회전한다. */
const barSx = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: BAR_WIDTH,
  height: BAR_HEIGHT,
  ml: `-${BAR_WIDTH / 2}px`,
  mt: `-${BAR_HEIGHT / 2}px`,
  borderRadius: 1,
  backgroundColor: 'currentColor',
  transition: 'transform 0.3s ease, opacity 0.2s ease',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
};

/**
 * HamburgerButton 컴포넌트
 *
 * 세 줄 막대가 X자로 부드럽게 바뀌는 햄버거 버튼. 애니메이션은 transform/opacity만 사용한다.
 * 터치 영역은 44x44px이다.
 *
 * Props:
 * @param {boolean} isOpen - 메뉴가 열려 있는지 여부 [Required]
 * @param {function} onClick - 버튼을 눌렀을 때 호출 [Required]
 * @param {string} controlsId - 이 버튼이 여닫는 메뉴 요소의 id (aria-controls) [Required]
 *
 * Example usage:
 * <HamburgerButton isOpen={isOpen} onClick={toggle} controlsId="mobile-menu" />
 */
function HamburgerButton({ isOpen, onClick, controlsId }) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      sx={{
        position: 'relative',
        width: 44,
        height: 44,
        borderRadius: 1,
        color: 'text.primary',
        '&:hover': { color: 'accent.text' },
      }}
    >
      <Box
        component="span"
        sx={{
          ...barSx,
          transform: isOpen
            ? 'translateY(0) rotate(45deg)'
            : `translateY(-${BAR_GAP}px) rotate(0)`,
        }}
      />
      <Box
        component="span"
        sx={{
          ...barSx,
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
        }}
      />
      <Box
        component="span"
        sx={{
          ...barSx,
          transform: isOpen
            ? 'translateY(0) rotate(-45deg)'
            : `translateY(${BAR_GAP}px) rotate(0)`,
        }}
      />
    </ButtonBase>
  );
}

export default HamburgerButton;
