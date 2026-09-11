import * as React from 'react';
import Typography from '@mui/material/Typography';

/**
 * SectionNumber 컴포넌트
 *
 * 섹션 배경에 크고 흐릿하게 표시되는 워터마크 숫자.
 *
 * Props:
 * @param {string} value - 표시할 숫자 텍스트 (예: '01') [Required]
 *
 * Example usage:
 * <SectionNumber value="01" />
 */
function SectionNumber({ value }) {
  return (
    <Typography
      aria-hidden="true"
      sx={{
        position: 'absolute',
        top: { xs: -20, md: -40 },
        right: { xs: 8, md: 24 },
        fontSize: { xs: '7rem', md: '13rem' },
        fontWeight: 800,
        lineHeight: 1,
        color: 'rgba(184, 196, 206, 0.06)',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {value}
    </Typography>
  );
}

export default SectionNumber;
