import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import HeroSection from '../components/landing/hero-section.jsx';
import AboutSection from '../components/landing/about-section.jsx';
import SkillTreeSection from '../components/landing/skill-tree-section.jsx';
import ProjectsSection from '../components/landing/projects-section.jsx';
import ContactSection from '../components/landing/contact-section.jsx';
import { scrollToSection } from '../utils/scroll-to-section.js';

/**
 * Home 페이지
 *
 * Hero, About Me, Skill Tree, Projects, Contact 5개 섹션으로 구성된다.
 * 다른 페이지의 메뉴(Contact)에서 넘어온 경우(location.state.scrollTo) 해당 섹션으로 스크롤한다.
 */
function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTarget = location.state?.scrollTo;

  React.useEffect(() => {
    if (!scrollTarget) return;

    /* 섹션이 그려진 뒤 이동하고, 새로고침/뒤로가기에서 다시 스크롤되지 않도록 state를 비운다. */
    const frameId = requestAnimationFrame(() => {
      scrollToSection(scrollTarget);
      navigate(location.pathname, { replace: true, state: null });
    });

    return () => cancelAnimationFrame(frameId);
  }, [scrollTarget, location.pathname, navigate]);

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
