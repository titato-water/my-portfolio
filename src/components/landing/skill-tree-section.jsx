import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { SiHtml5, SiCss, SiJavascript, SiReact, SiGit, SiGithub, SiFigma } from 'react-icons/si';
import SectionHeading from '../ui/section-heading.jsx';

const SKILLS = [
  { label: 'HTML', Icon: SiHtml5, color: '#E34F26' },
  { label: 'CSS', Icon: SiCss, color: '#1572B6' },
  { label: 'JS', Icon: SiJavascript, color: '#F7DF1E' },
  { label: 'REACT', Icon: SiReact, color: '#61DAFB' },
  { label: 'GIT', Icon: SiGit, color: '#F05032' },
  { label: 'GITHUB', Icon: SiGithub, color: null },
  { label: 'FIGMA', Icon: SiFigma, color: '#F24E1E' },
];

/**
 * Skill Tree 섹션
 *
 * 보유 기술 스택을 태그 형태로 나열하는 섹션.
 */
function SkillTreeSection() {
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
        <SectionHeading label="Skill Tree" index="03" total="05" />
        <Typography
          sx={{
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: 'text.primary',
            mb: 2,
          }}
        >
          Skill Tree
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
          사용할 수 있는 기술 스택입니다.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, md: 2 } }}>
          {SKILLS.map(({ label, Icon, color }) => (
            <Box
              key={label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                px: { xs: 2.5, md: 3 },
                py: { xs: 1.25, md: 1.5 },
                transition: 'border-color 0.2s ease, color 0.2s ease',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'accent.main',
                  color: 'accent.main',
                },
              }}
            >
              <Icon size={18} color={color ?? 'currentColor'} />
              <Typography
                sx={{
                  fontSize: { xs: '0.85rem', md: '0.95rem' },
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
