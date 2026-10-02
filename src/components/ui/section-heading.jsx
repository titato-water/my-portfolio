import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * SectionHeading 컴포넌트
 *
 * 각 섹션 상단에 라벨을 표시하고 하단에 얇은 구분선을 그린다. 라벨은 섹션의 h2 제목 역할을 한다.
 *
 * Props:
 * @param {string} label - 섹션 라벨 텍스트 (예: 'About Me') [Required]
 *
 * Example usage:
 * <SectionHeading label="About Me" />
 */
function SectionHeading({ label }) {
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
      <Typography variant="overline" component="h2" sx={{ color: 'accent.text' }}>
        {label}
      </Typography>
    </Box>
  );
}

export default SectionHeading;
