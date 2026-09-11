import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * SectionHeading 컴포넌트
 *
 * 각 섹션 상단에 라벨과 인덱스(예: 02/05)를 표시하고 하단에 얇은 구분선을 그린다.
 *
 * Props:
 * @param {string} label - 섹션 라벨 텍스트 (예: 'About Me') [Required]
 * @param {string} index - 현재 섹션 순번 (예: '02') [Required]
 * @param {string} total - 전체 섹션 개수 (예: '05') [Required]
 *
 * Example usage:
 * <SectionHeading label="About Me" index="02" total="05" />
 */
function SectionHeading({ label, index, total }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        pb: 2,
        mb: { xs: 5, md: 8 },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="overline" sx={{ color: 'accent.main' }}>
        {label}
      </Typography>
      <Typography variant="overline" sx={{ color: 'text.disabled' }}>
        {index}/{total}
      </Typography>
    </Box>
  );
}

export default SectionHeading;
