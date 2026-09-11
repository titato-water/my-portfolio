import * as React from 'react';
import Box from '@mui/material/Box';
import HeroSection from '../components/landing/hero-section.jsx';
import AboutSection from '../components/landing/about-section.jsx';
import SkillTreeSection from '../components/landing/skill-tree-section.jsx';
import ProjectsSection from '../components/landing/projects-section.jsx';
import ContactSection from '../components/landing/contact-section.jsx';

/**
 * Home 페이지
 *
 * Hero, About Me, Skill Tree, Projects, Contact 5개 섹션으로 구성된다.
 */
function Home() {
  return (
    <Box component="main" sx={{ width: '100%', flexGrow: 1 }}>
      <HeroSection />
      <AboutSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
    </Box>
  );
}

export default Home;
