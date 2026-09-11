import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

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
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.default',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', px: { xs: 2, md: 3 } }}>
        <Avatar
          sx={{
            width: 72,
            height: 72,
            mx: 'auto',
            mb: 3,
            background:
              'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
          }}
        >
          <PersonRoundedIcon fontSize="large" />
        </Avatar>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
          }}
        >
          About Me
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.7,
            color: 'text.secondary',
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
