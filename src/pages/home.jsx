import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import HeroSection from '../components/landing/hero-section.jsx';
import AboutSection from '../components/landing/about-section.jsx';
import SkillTreeSection from '../components/landing/skill-tree-section.jsx';
import ProjectsSection from '../components/landing/projects-section.jsx';
import { scrollToSection } from '../utils/scroll-to-section.js';

/* 가장 아래에 있는 Contact(방명록, 애니메이션 라이브러리 포함)는 첫 화면 이후에 불러온다. */
const ContactSection = React.lazy(() => import('../components/landing/contact-section.jsx'));

/**
 * Contact 코드를 불러오는 동안 같은 id와 비슷한 높이를 유지하는 자리 표시.
 * 메뉴의 Contact 이동이 먼저 눌려도 위치를 찾을 수 있고, 로딩 후 레이아웃이 크게 흔들리지 않는다.
 */
const CONTACT_FALLBACK = (
  <Box id="contact" component="section" sx={{ width: '100%', minHeight: { xs: 1100, md: 760 } }} />
);

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
      <React.Suspense fallback={CONTACT_FALLBACK}>
        <ContactSection />
      </React.Suspense>
    </Box>
  );
}

export default Home;
