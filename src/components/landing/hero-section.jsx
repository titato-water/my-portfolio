import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

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
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: { xs: '70vh', md: '85vh' },
        background:
          'linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)',
        py: { xs: 8, md: 14 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: { xs: -80, md: -120 },
          right: { xs: -80, md: -60 },
          width: { xs: 220, md: 420 },
          height: { xs: 220, md: 420 },
          borderRadius: '50%',
          background: 'var(--color-primary)',
          opacity: 0.25,
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: -100, md: -140 },
          left: { xs: -100, md: -80 },
          width: { xs: 260, md: 460 },
          height: { xs: 260, md: 460 },
          borderRadius: '50%',
          background: 'var(--color-accent)',
          opacity: 0.12,
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative' }}>
        <Typography
          component="span"
          sx={{
            display: 'inline-block',
            mb: 3,
            px: 2.5,
            py: 0.75,
            borderRadius: 999,
            fontSize: { xs: '0.75rem', md: '0.85rem' },
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'background.default',
            backgroundColor: 'accent.main',
          }}
        >
          Hero
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.25rem', md: '3.5rem' },
            fontWeight: 800,
            lineHeight: 1.25,
            mb: 3,
            background:
              'linear-gradient(90deg, #ffffff 0%, var(--color-text-secondary) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          여기는 Hero 섹션입니다
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            lineHeight: 1.7,
            color: 'text.secondary',
            maxWidth: 560,
            mx: 'auto',
          }}
        >
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Container>

      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 32 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: { xs: 'none', sm: 'flex' },
          color: 'text.disabled',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(8px)' },
          },
          animation: 'bounce 2s ease-in-out infinite',
        }}
      >
        <KeyboardArrowDownRoundedIcon fontSize="large" />
      </Box>
    </Box>
  );
}

export default HeroSection;
