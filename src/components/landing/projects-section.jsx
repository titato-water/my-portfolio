import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import SectionHeading from '../ui/section-heading.jsx';
import TextLink from '../ui/text-link.jsx';

const PLACEHOLDER_PROJECTS = ['Project 1', 'Project 2', 'Project 3', 'Project 4'];

/**
 * Projects 섹션
 *
 * 대표작 리스트와 Projects 페이지로 이동하는 '더 보기' 링크를 제공하는 플레이스홀더 섹션.
 */
function ProjectsSection() {
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
          여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이
          들어갈 예정입니다.
        </Typography>
        <Box sx={{ mb: 5 }}>
          {PLACEHOLDER_PROJECTS.map((name, i) => (
            <Box
              key={name}
              sx={{
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
                  0{i + 1}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.25rem', md: '1.75rem' },
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  {name}
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
