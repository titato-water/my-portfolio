import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

/**
 * HighlightStats 컴포넌트
 *
 * 큰 숫자와 라벨로 핵심 수치를 보여주는 통계 줄.
 *
 * Props:
 * @param {Array<{value: string|number, label: string}>} items - 표시할 통계 항목 목록 [Required]
 *
 * Example usage:
 * <HighlightStats items={[{ value: 5, label: 'Projects' }, { value: 2026, label: 'Since' }]} />
 */
function HighlightStats({ items }) {
  return (
    <Grid container aria-label="핵심 수치">
      {items.map((item) => (
        <Grid
          key={item.label}
          size={{ xs: 4 }}
          sx={{
            py: { xs: 3, md: 5 },
            px: { xs: 1, md: 4 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box>
            <Typography
              component="p"
              sx={{
                fontSize: { xs: '2rem', md: '3.5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'accent.main',
              }}
            >
              {item.value}
            </Typography>
            <Typography
              variant="overline"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.6,
                fontSize: { xs: '0.65rem', md: '0.8rem' },
              }}
            >
              {item.label}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default HighlightStats;
