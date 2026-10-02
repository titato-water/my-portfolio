import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { Link as RouterLink } from 'react-router-dom';
import SectionHeading from '../ui/section-heading.jsx';
import TextLink from '../ui/text-link.jsx';
import useProjects from '../../hooks/use-projects.js';

const FEATURED_COUNT = 4;

/**
 * Projects 섹션
 *
 * Supabase에서 불러온 대표작(앞쪽 4개) 리스트와 Projects 페이지로 이동하는 '더 보기' 링크를 제공한다.
 */
function ProjectsSection() {
  const { projects, status } = useProjects();
  const featuredProjects = projects.slice(0, FEATURED_COUNT);

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
        <SectionHeading label="Projects" index="04" total="05" />
        <Typography
          sx={{
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: 'text.primary',
            mb: 2,
          }}
        >
          Projects
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.7,
            color: 'text.secondary',
            maxWidth: 560,
            mb: 5,
          }}
        >
          직접 만들고 배포한 프로젝트들입니다.
        </Typography>
        {status === 'error' && (
          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            프로젝트를 불러오지 못했습니다.
          </Typography>
        )}
        <Box sx={{ mb: 5 }}>
          {featuredProjects.map((project, i) => (
            <Box
              key={project.id}
              component={RouterLink}
              to="/projects"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: { xs: 2.5, md: 3.5 },
                borderTop: i === 0 ? '1px solid' : 'none',
                borderBottom: '1px solid',
                borderColor: 'divider',
                transition: 'padding-left 0.2s ease',
                '&:hover': {
                  pl: 1.5,
                  '& .project-arrow': {
                    opacity: 1,
                    transform: 'translate(0, 0)',
                  },
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: { xs: 2, md: 4 } }}>
                <Typography
                  sx={{
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    color: 'text.disabled',
                    fontWeight: 600,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.25rem', md: '1.75rem' },
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  {project.title}
                </Typography>
              </Box>
              <ArrowOutwardRoundedIcon
                className="project-arrow"
                sx={{
                  color: 'accent.main',
                  opacity: 0,
                  transform: 'translate(-4px, 4px)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                }}
              />
            </Box>
          ))}
        </Box>
        <TextLink to="/projects">더 보기</TextLink>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
