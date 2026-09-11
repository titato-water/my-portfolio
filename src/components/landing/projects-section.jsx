import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const PLACEHOLDER_PROJECTS = ['Project 1', 'Project 2', 'Project 3', 'Project 4'];

/**
 * Projects 섹션
 *
 * 대표작 썸네일과 Projects 페이지로 이동하는 '더 보기' 버튼을 제공하는 플레이스홀더 섹션.
 */
function ProjectsSection() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
          }}
        >
          Projects
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6,
            color: 'text.secondary',
            mb: 4,
          }}
        >
          여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이
          들어갈 예정입니다.
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {PLACEHOLDER_PROJECTS.map((name) => (
            <Grid key={name} size={{ xs: 6, md: 3 }}>
              <Card
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  height: '100%',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: { xs: 80, md: 100 },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      color: 'text.disabled',
                    }}
                  >
                    {name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          component={RouterLink}
          to="/projects"
          variant="outlined"
          sx={{
            borderColor: 'accent.main',
            color: 'accent.main',
            '&:hover': {
              borderColor: 'accent.hover',
              color: 'accent.hover',
            },
          }}
        >
          더 보기
        </Button>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
