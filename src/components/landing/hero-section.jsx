import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import FeaturedProjectCard from '../ui/featured-project-card.jsx';
import RevealText from '../ui/reveal-text.jsx';
import usePortfolio from '../../hooks/use-portfolio.js';
import useProjects from '../../hooks/use-projects.js';
import { GITHUB_URL } from '../../utils/contact-info.js';

/** 헤드라인 전용 폰트 (Pretendard Variable) */
const HEADLINE_FONT = '"Pretendard Variable", Pretendard, "Roboto", "Helvetica", "Arial", sans-serif';

/** 헤드라인 줄 구성 (isAccent: 포인트 컬러로 강조할 단어) */
const HEADLINE_LINES = [
  [{ text: '디자인과' }, { text: '기능이' }, { text: '어우러진' }],
  [{ text: '화면을', isAccent: true }, { text: '만듭니다.' }],
];

/** 모션 줄이기 설정을 켠 사용자는 모든 애니메이션을 끈다. */
const REDUCED_MOTION = '@media (prefers-reduced-motion: reduce)';

/** 모바일에서 카드 대신 보여줄 프로젝트 이름 개수 */
const MOBILE_PROJECT_NAME_COUNT = 3;

/** 헤드라인 타이핑이 끝나는 시점(초): 아래 요소들이 이후에 차례로 나타난다. */
const HEADLINE_END_DELAY = 1.4;

/**
 * 연락하기 클릭 시 Contact 섹션(id="contact")으로 이동한다.
 * HashRouter를 쓰므로 #앵커 대신 scrollIntoView를 사용한다.
 */
function scrollToContact() {
  const target = document.getElementById('contact');
  if (!target) return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
}

/**
 * Hero 섹션
 *
 * - 배경: 포인트 컬러의 천천히 움직이는 광원 + 가장자리가 흐려지는 점 격자 (다크/라이트 대응)
 * - 타이포: Pretendard 헤드라인, 글자별 타이핑 등장, 포인트 단어 강조
 * - 애니메이션: 순차 페이드인, CTA 호버 효과, 클릭 가능한 스크롤 유도 화살표
 * - 구성: 이름·직무·지역 오버라인 / 헤드라인 / 서브카피 / CTA(프로젝트 보기·연락하기·GitHub) /
 *   카운터(배포까지 마친 프로젝트 수) / 대표 프로젝트 카드(데스크탑)·프로젝트 이름 줄(모바일)
 * - 모든 모션은 prefers-reduced-motion 설정을 존중한다.
 */
function HeroSection() {
  const { aboutMeData } = usePortfolio();
  const { projects, status } = useProjects();
  const heroRef = React.useRef(null);
  const { name, role } = aboutMeData.basicInfo;
  const isLoaded = status === 'loaded';

  const deployedProjects = projects.filter((project) => project.detail_url);
  const featuredProject = deployedProjects.find((project) => project.thumbnail_url);

  const handleScrollDown = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (!nextSection) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    nextSection.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
  };

  /** 헤드라인 이후 요소의 등장 지연 */
  const fadeDelay = (order) => `${HEADLINE_END_DELAY + order * 0.12}s`;

  return (
    <Box
      ref={heroRef}
      component="section"
      sx={(theme) => {
        const isDark = theme.palette.mode === 'dark';
        /* 밝은 배경에서는 같은 빨강이 훨씬 옅게 보여서 라이트 모드의 농도를 높인다. */
        const dotColor = isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(0, 0, 0, 0.22)';
        const glowColor = isDark ? 'rgba(225, 37, 27, 0.3)' : 'rgba(225, 37, 27, 0.45)';
        const cornerGlow = isDark ? 'rgba(225, 37, 27, 0.1)' : 'rgba(225, 37, 27, 0.2)';

        return {
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          minHeight: { md: 'calc(100vh - 70px)' },
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.default',
          /* 왼쪽 아래 모서리의 은은한 광원 (오른쪽 위 광원과 대각선으로 균형을 맞춘다) */
          backgroundImage: `radial-gradient(ellipse 55% 65% at 0% 100%, ${cornerGlow}, transparent 70%)`,
          px: { xs: 2, md: 6 },
          pt: { xs: 10, md: 12 },
          pb: { xs: 12, md: 16 },
          '@keyframes hero-fade-up': {
            from: { opacity: 0, transform: 'translateY(12px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          '@keyframes hero-blink': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.25 },
          },
          '@keyframes hero-glow': {
            from: { transform: 'translate(0, 0) scale(1)' },
            to: { transform: 'translate(-40px, 30px) scale(1.12)' },
          },
          '@keyframes hero-bounce': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(6px)' },
          },
          '& .hero-fade': {
            animation: 'hero-fade-up 0.7s ease-out both',
            [REDUCED_MOTION]: { animation: 'none' },
          },
          /* 배경 1: 가장자리가 흐려지는 점 격자 */
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            WebkitMaskImage:
              'radial-gradient(ellipse 75% 65% at 70% 45%, #000 15%, transparent 75%)',
            maskImage: 'radial-gradient(ellipse 75% 65% at 70% 45%, #000 15%, transparent 75%)',
          },
          /* 배경 2: 천천히 움직이는 포인트 컬러 광원 */
          '&::after': {
            content: '""',
            position: 'absolute',
            top: { xs: -100, md: -160 },
            right: { xs: -160, md: -100 },
            width: { xs: 420, md: 780 },
            height: { xs: 420, md: 780 },
            borderRadius: '50%',
            pointerEvents: 'none',
            background: `radial-gradient(circle, ${glowColor}, transparent 65%)`,
            animation: 'hero-glow 14s ease-in-out infinite alternate',
            [REDUCED_MOTION]: { animation: 'none' },
          },
        };
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 0, md: 8 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              className="hero-fade"
              variant="overline"
              sx={{
                display: 'block',
                color: 'accent.main',
                fontSize: { xs: '0.75rem', md: '0.85rem' },
                fontWeight: 700,
                letterSpacing: '0.2em',
                mb: { xs: 2, md: 3 },
              }}
            >
              {name} · {role}
            </Typography>
            <Typography
              component="h1"
              sx={{
                fontFamily: HEADLINE_FONT,
                fontSize: 'clamp(2.5rem, 4.6vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: 'text.primary',
                mb: { xs: 3, md: 4 },
                wordBreak: 'keep-all',
              }}
            >
              <RevealText lines={HEADLINE_LINES} startDelay={0.25} charDelay={0.045} />
            </Typography>
            <Typography
              className="hero-fade"
              sx={{
                fontSize: { xs: '1.05rem', md: '1.3rem' },
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'text.secondary',
                maxWidth: 680,
                mb: { xs: 4, md: 5 },
                wordBreak: 'keep-all',
                animationDelay: fadeDelay(0),
              }}
            >
              React로 직접 만들고 배포합니다. 소통하며 끝까지 마무리합니다.
            </Typography>
            <Box
              className="hero-fade"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: { xs: 1, md: 2 },
                animationDelay: fadeDelay(1),
              }}
            >
              <Button
                component={RouterLink}
                to="/projects"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  px: 4,
                  fontWeight: 700,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 10px 24px rgba(225, 37, 27, 0.4)',
                  },
                  '&:active': { transform: 'translateY(0) scale(0.97)' },
                }}
              >
                프로젝트 보기
              </Button>
              <Button
                onClick={scrollToContact}
                color="inherit"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  transition: 'transform 0.2s ease, color 0.2s ease',
                  '&:hover': {
                    color: 'accent.main',
                    backgroundColor: 'transparent',
                    transform: 'translateY(-2px)',
                    '& .MuiButton-endIcon': { transform: 'translateX(4px)' },
                  },
                  '& .MuiButton-endIcon': { transition: 'transform 0.2s ease' },
                }}
              >
                연락하기
              </Button>
              <Button
                component="a"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (새 탭에서 열기)"
                color="inherit"
                size="large"
                startIcon={<GitHubIcon />}
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  transition: 'transform 0.2s ease, color 0.2s ease',
                  '&:hover': {
                    color: 'accent.main',
                    backgroundColor: 'transparent',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                GitHub
              </Button>
            </Box>
            <Box
              className="hero-fade"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 1.5,
                mt: { xs: 4, md: 5 },
                minHeight: 24,
                color: 'text.secondary',
                animationDelay: fadeDelay(2),
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'accent.main',
                  boxShadow: '0 0 10px rgba(225, 37, 27, 0.8)',
                  animation: 'hero-blink 2.4s ease-in-out infinite',
                  [REDUCED_MOTION]: { animation: 'none' },
                }}
              />
              <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                {isLoaded && `배포까지 마친 프로젝트 ${deployedProjects.length}개 · `}
                지금 새 기회에 열려 있어요
              </Typography>
            </Box>
            {deployedProjects.length > 0 && (
              <Typography
                className="hero-fade"
                component={RouterLink}
                to="/projects"
                sx={{
                  display: { xs: 'block', md: 'none' },
                  mt: 2,
                  fontSize: '0.9rem',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  animationDelay: fadeDelay(3),
                }}
              >
                {deployedProjects
                  .slice(0, MOBILE_PROJECT_NAME_COUNT)
                  .map((project) => project.title)
                  .join(' · ')}{' '}
                →
              </Typography>
            )}
          </Grid>
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: { xs: 'none', md: 'block' }, minHeight: { md: 280 } }}
          >
            {featuredProject && (
              <Box className="hero-fade" sx={{ animationDelay: fadeDelay(2) }}>
                <FeaturedProjectCard
                  title={featuredProject.title}
                  description={featuredProject.description}
                  techStack={featuredProject.tech_stack}
                  thumbnailUrl={featuredProject.thumbnail_url}
                  href={featuredProject.detail_url}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
      <ButtonBase
        className="hero-fade"
        onClick={handleScrollDown}
        aria-label="아래로 스크롤"
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: { xs: 20, md: 28 },
          ml: '-30px',
          width: 60,
          flexDirection: 'column',
          gap: 0.5,
          color: 'text.secondary',
          borderRadius: 1,
          animationDelay: fadeDelay(4),
          transition: 'color 0.2s ease',
          '&:hover': { color: 'accent.main' },
        }}
      >
        <Typography variant="overline" sx={{ lineHeight: 1.4, letterSpacing: '0.2em' }}>
          Scroll
        </Typography>
        <KeyboardArrowDownRoundedIcon
          fontSize="small"
          sx={{
            animation: 'hero-bounce 2s ease-in-out infinite',
            [REDUCED_MOTION]: { animation: 'none' },
          }}
        />
      </ButtonBase>
    </Box>
  );
}

export default HeroSection;
