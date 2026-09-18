import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SectionHeading from '../ui/section-heading.jsx';
import SectionNumber from '../ui/section-number.jsx';

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
        overflow: 'hidden',
        width: '100%',
        backgroundColor: 'background.default',
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <SectionNumber value="01" />
      <Container maxWidth="xl" disableGutters sx={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading label="Hero" index="01" total="05" />
        <Box sx={{ maxWidth: 760 }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '2.75rem', md: '5rem' },
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'text.primary',
              mb: 3,
            }}
          >
            여기는
            <br />
            Hero 섹션입니다
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.7,
              color: 'text.secondary',
              maxWidth: 480,
            }}
          >
            메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: { xs: 8, md: 12 },
            color: 'text.disabled',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(6px)' },
            },
          }}
        >
          <Typography variant="overline">Scroll</Typography>
          <KeyboardArrowDownRoundedIcon
            fontSize="small"
            sx={{ animation: 'bounce 2s ease-in-out infinite' }}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
