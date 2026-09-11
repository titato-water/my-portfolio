import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SectionNumber from '../components/ui/section-number.jsx';

/**
 * About Me 페이지
 *
 * 상세한 자기소개가 들어갈 플레이스홀더 페이지.
 */
function AboutMe() {
  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default',
        px: { xs: 2, md: 6 },
        py: { xs: 10, md: 16 },
      }}
    >
      <SectionNumber value="02" />
      <Container maxWidth="lg" disableGutters sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="overline" sx={{ color: 'accent.main' }}>
          About Me
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'text.primary',
            mt: 1,
            mb: 3,
          }}
        >
          About Me
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            lineHeight: 1.7,
            color: 'text.secondary',
            maxWidth: 560,
          }}
        >
          About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈
          예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default AboutMe;
