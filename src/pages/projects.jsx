import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

/**
 * Projects 페이지
 *
 * 포트폴리오 작품들이 들어갈 플레이스홀더 페이지.
 */
function Projects() {
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
            backgroundColor: 'rgba(242, 226, 5, 0.15)',
            color: 'accent.main',
          }}
        >
          <FolderRoundedIcon fontSize="large" />
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
          Projects
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.7,
            color: 'text.secondary',
          }}
        >
          Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈
          예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default Projects;
