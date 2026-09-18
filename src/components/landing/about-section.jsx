import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SectionHeading from '../ui/section-heading.jsx';
import TextLink from '../ui/text-link.jsx';

/**
 * About Me 섹션
 *
 * 간단한 자기소개와 About Me 페이지로 이동하는 '더 알아보기' 링크를 제공하는 플레이스홀더 섹션.
 */
function AboutSection() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        backgroundColor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <SectionHeading label="About Me" index="02" total="05" />
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: { xs: 'flex-start', md: 'flex-start' },
              borderRight: { md: '1px solid' },
              borderColor: { md: 'divider' },
            }}
          >
            <PersonOutlineRoundedIcon
              sx={{ fontSize: { xs: 56, md: 88 }, color: 'accent.main' }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }} sx={{ pl: { md: 2 } }}>
            <Typography
              sx={{
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'text.primary',
                mb: 2,
              }}
            >
              About Me
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7,
                color: 'text.secondary',
                maxWidth: 560,
                mb: 4,
              }}
            >
              여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기'
              버튼이 들어갈 예정입니다.
            </Typography>
            <TextLink to="/about">더 알아보기</TextLink>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutSection;
