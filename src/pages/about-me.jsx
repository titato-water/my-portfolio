import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ContentTabs from '../components/ui/content-tabs.jsx';
import HighlightStats from '../components/ui/highlight-stats.jsx';
import ProfileCard from '../components/ui/profile-card.jsx';
import SkillsSection from '../components/about/skills-section.jsx';
import usePortfolio from '../hooks/use-portfolio.js';
import useProjects from '../hooks/use-projects.js';
import { startedYear } from '../utils/about-me-data.js';

/**
 * About Me 페이지
 *
 * 기본 정보 카드, 핵심 수치, 콘텐츠 섹션(개발 스토리/철학/개인 이야기) 탭, 스킬 섹션을 보여준다.
 * 데이터는 PortfolioContext에서 읽는다. (홈 탭의 About Me/Skill Tree 섹션과 같은 데이터를 공유)
 * 수치 중 프로젝트/팀 프로젝트 수는 Supabase projects 데이터에서 계산한다.
 */
function AboutMe() {
  const { aboutMeData } = usePortfolio();
  const { basicInfo, sections, skills } = aboutMeData;
  const { projects, status } = useProjects();
  const isLoaded = status === 'loaded';

  const stats = [
    { value: isLoaded ? projects.length : '-', label: 'Projects' },
    {
      value: isLoaded ? projects.filter((project) => !project.is_personal).length : '-',
      label: 'Team Projects',
    },
    { value: startedYear, label: 'Started' },
  ];

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
        <Typography variant="overline" sx={{ color: 'accent.text' }}>
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
            mb: { xs: 4, md: 6 },
          }}
        >
          About Me
        </Typography>
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <ProfileCard
            name={basicInfo.name}
            role={basicInfo.role}
            education={basicInfo.education}
            major={basicInfo.major}
            experience={basicInfo.experience}
            photo={basicInfo.photo}
          />
        </Box>
        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <HighlightStats items={stats} />
        </Box>
        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <ContentTabs sections={sections} />
        </Box>
        <SkillsSection skills={skills} />
      </Container>
    </Box>
  );
}

export default AboutMe;
