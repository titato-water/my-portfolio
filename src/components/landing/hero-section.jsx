import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * Hero 섹션
 *
 * 메인 비주얼, 이름, 간단 소개가 들어갈 자리를 안내하는 플레이스홀더 섹션.
 */
function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)',
        py: { xs: 8, md: 14 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          component="span"
          sx={{
            display: 'inline-block',
            mb: 2,
            px: 2,
            py: 0.5,
            borderRadius: 4,
            fontSize: { xs: '0.75rem', md: '0.85rem' },
            fontWeight: 600,
            color: 'background.default',
            backgroundColor: 'primary.main',
          }}
        >
          Hero
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
            lineHeight: 1.3,
            color: 'text.primary',
            mb: 2,
          }}
        >
          여기는 Hero 섹션입니다
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6,
            color: 'text.secondary',
          }}
        >
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default HeroSection;
