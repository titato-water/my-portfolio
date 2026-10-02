import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ProjectCard from '../components/ui/project-card.jsx';
import useProjects from '../hooks/use-projects.js';

/**
 * Projects 페이지
 *
 * Supabase projects 테이블의 게시된 프로젝트를 가로형 카드 리스트로 보여준다.
 */
function Projects() {
  const { projects, status } = useProjects();

  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: 'background.default',
        px: { xs: 2, md: 6 },
        py: { xs: 10, md: 16 },
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="overline" sx={{ color: 'accent.main' }}>
          Projects
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
          Projects
        </Typography>
        {status === 'loading' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        )}
        {status === 'error' && (
          <Typography sx={{ color: 'text.secondary' }}>
            프로젝트를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </Typography>
        )}
        {status === 'loaded' && projects.length === 0 && (
          <Typography sx={{ color: 'text.secondary' }}>
            아직 등록된 프로젝트가 없습니다.
          </Typography>
        )}
        {status === 'loaded' && projects.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                techStack={project.tech_stack}
                detailUrl={project.detail_url}
                githubUrl={project.github_url}
                thumbnailUrl={project.thumbnail_url}
                isPersonal={project.is_personal}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Projects;
