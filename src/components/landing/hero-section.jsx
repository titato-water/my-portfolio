import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import FeaturedProjectCard from '../ui/featured-project-card.jsx';
import RevealText from '../ui/reveal-text.jsx';
import usePortfolio from '../../hooks/use-portfolio.js';
import useProjects from '../../hooks/use-projects.js';
import { GITHUB_URL } from '../../utils/contact-info.js';
import { scrollToSection } from '../../utils/scroll-to-section.js';

/** 헤드라인 줄 구성 (isAccent: 포인트 컬러로 강조할 단어) */
const HEADLINE_LINES = [
  [{ text: '디자인과' }, { text: '기능이' }, { text: '어우러진' }],
  [{ text: '화면을', isAccent: true }, { text: '만듭니다.' }],
];

/** 반응형 기준: 모바일(~767px) / 한 열 레이아웃(~1023px) / 데스크톱(1200px~) */
const MOBILE_QUERY = '(max-width:767px)';
const TWO_COLUMN_QUERY = '(min-width:1024px)';
const DESKTOP_QUERY = '(min-width:1200px)';

/** 화면 크기별 여백 (theme.spacing 단위, 1 = 8px) */
const SECTION_SPACING = {
  mobile: { px: 2.5, pt: 8, pb: 13 },
  tablet: { px: 4, pt: 10, pb: 14 },
  desktop: { px: 6, pt: 12, pb: 16 },
};

/** 터치 대상의 최소 높이(px). 권장 최소값 44px 이상을 확보한다. */
const TOUCH_TARGET_HEIGHT = 48;

/** 대표 프로젝트 카드에서 썸네일 아래 정보 영역의 높이(px). 로딩 자리 표시와 맞춘다. */
const CARD_INFO_HEIGHT = 184;

/** 모션 줄이기 설정을 켠 사용자는 모든 애니메이션을 끈다. */
const REDUCED_MOTION = '@media (prefers-reduced-motion: reduce)';

/** 모바일에서 카드 대신 보여줄 프로젝트 이름 개수 */
const MOBILE_PROJECT_NAME_COUNT = 3;

/** 헤드라인 타이핑이 끝나는 시점(초): 아래 요소들이 이후에 차례로 나타난다. */
const HEADLINE_END_DELAY = 1.4;


/**
 * Hero 섹션
 *
 * - 배경: 포인트 컬러의 천천히 움직이는 광원 + 가장자리가 흐려지는 점 격자 (다크/라이트 대응)
 * - 타이포: Pretendard 헤드라인, 글자별 타이핑 등장, 포인트 단어 강조
 * - 애니메이션: 순차 페이드인, CTA 호버 효과, 클릭 가능한 스크롤 유도 화살표
 * - 모든 모션은 prefers-reduced-motion 설정을 존중한다.
 *
 * 반응형 (useMediaQuery로 레이아웃을 바꾸고, 세부 스타일은 sx로 지정):
 * - 모바일(~767px): 한 열, 헤드라인 h2 크기, 버튼 세로 전체 너비, 대표 카드 대신 프로젝트 이름 줄
 * - 태블릿(768~1199px): 1023px까지 한 열(카드는 아래에 표시), 이후 두 열. 여백은 중간 값
 * - 데스크톱(1200px~): 두 열, 여유로운 여백, h1 크기 헤드라인
 * - 모든 버튼/링크는 높이 44px 이상(48px)으로 터치하기 쉽게 만든다.
 */
function HeroSection() {
  const { aboutMeData } = usePortfolio();
  const { projects, status } = useProjects();
  const heroRef = React.useRef(null);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isTwoColumn = useMediaQuery(TWO_COLUMN_QUERY);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const { name, role } = aboutMeData.basicInfo;
  const isLoaded = status === 'loaded';

  const spacing = isMobile
    ? SECTION_SPACING.mobile
    : isDesktop
      ? SECTION_SPACING.desktop
      : SECTION_SPACING.tablet;
  const headlineSize = isMobile
    ? 'clamp(2.125rem, 9.5vw, 3rem)'
    : isTwoColumn
      ? 'clamp(2.5rem, 4.6vw, 4.5rem)'
      : '4rem';

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

  /** 모든 CTA 버튼이 공유하는 터치 친화 스타일 */
  const touchButtonSx = {
    minHeight: TOUCH_TARGET_HEIGHT,
    fontWeight: 600,
    color: 'text.primary',
    transition: 'transform 0.2s ease, color 0.2s ease, background-color 0.2s ease',
    '&:hover': {
      color: 'accent.text',
      backgroundColor: 'action.hover',
      transform: 'translateY(-2px)',
    },
  };

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
          /* 헤더 높이(모바일 61px, 그 이상 약 70px)를 뺀 화면 높이를 채운다. */
          minHeight: isMobile ? 'calc(100svh - 61px)' : 'calc(100svh - 70px)',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.default',
          /* 왼쪽 아래 모서리의 은은한 광원 (오른쪽 위 광원과 대각선으로 균형을 맞춘다) */
          backgroundImage: `radial-gradient(ellipse 55% 65% at 0% 100%, ${cornerGlow}, transparent 70%)`,
          px: spacing.px,
          pt: spacing.pt,
          pb: spacing.pb,
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
            top: isMobile ? -100 : -160,
            right: isMobile ? -160 : -100,
            width: isMobile ? 420 : 780,
            height: isMobile ? 420 : 780,
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
        <Grid
          container
          spacing={isTwoColumn ? (isDesktop ? 10 : 6) : 0}
          sx={{ alignItems: 'center' }}
        >
          <Grid size={isTwoColumn ? 7 : 12}>
            <Typography
              className="hero-fade"
              variant="overline"
              component="p"
              sx={{
                color: 'accent.text',
                fontSize: isMobile ? '0.75rem' : '0.85rem',
                fontWeight: 700,
                letterSpacing: isMobile ? '0.14em' : '0.2em',
                mb: isMobile ? 2 : 3,
              }}
            >
              <Box component="span" sx={{ display: isMobile ? 'block' : 'inline' }}>
                {name}
              </Box>
              {!isMobile && ' · '}
              <Box component="span">{role}</Box>
            </Typography>
            <Typography
              variant={isMobile ? 'h2' : 'h1'}
              component="h1"
              sx={{
                fontSize: headlineSize,
                fontWeight: 800,
                lineHeight: isMobile ? 1.2 : 1.15,
                letterSpacing: '-0.03em',
                color: 'text.primary',
                mb: isMobile ? 2.5 : 4,
                wordBreak: 'keep-all',
              }}
            >
              <RevealText
                lines={HEADLINE_LINES}
                startDelay={0.25}
                charDelay={0.045}
                hasLineBreaks={!isMobile}
              />
            </Typography>
            <Typography
              className="hero-fade"
              sx={{
                fontSize: isMobile ? '1.05rem' : isDesktop ? '1.3rem' : '1.2rem',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'text.secondary',
                maxWidth: 680,
                mb: isMobile ? 4 : 5,
                wordBreak: 'keep-all',
                animationDelay: fadeDelay(0),
              }}
            >
              React로 직접 만들고 배포합니다. 소통하며 끝까지 마무리합니다.
            </Typography>
            <Box
              className="hero-fade"
              sx={
                isMobile
                  ? {
                      /* 모바일: 주 버튼은 전체 너비, 보조 버튼 둘은 같은 너비로 나란히 */
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 1.5,
                      animationDelay: fadeDelay(1),
                    }
                  : {
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: 2,
                      animationDelay: fadeDelay(1),
                    }
              }
            >
              <Button
                component={RouterLink}
                to="/projects"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  px: 4,
                  minHeight: isMobile ? 52 : TOUCH_TARGET_HEIGHT,
                  fontWeight: 700,
                  gridColumn: isMobile ? '1 / -1' : 'auto',
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
                onClick={() => scrollToSection('contact')}
                color="inherit"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  ...touchButtonSx,
                  backgroundColor: isMobile ? 'action.hover' : 'transparent',
                  '& .MuiButton-endIcon': { transition: 'transform 0.2s ease' },
                  '&:hover': {
                    ...touchButtonSx['&:hover'],
                    '& .MuiButton-endIcon': { transform: 'translateX(4px)' },
                  },
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
                  ...touchButtonSx,
                  backgroundColor: isMobile ? 'action.hover' : 'transparent',
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
                mt: isMobile ? 4 : 5,
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
              <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                {status !== 'error' &&
                  `배포까지 마친 프로젝트 ${isLoaded ? deployedProjects.length : '-'}개 · `}
                지금 새 기회에 열려 있어요
              </Typography>
            </Box>
            {isMobile && deployedProjects.length > 0 && (
              <Typography
                className="hero-fade"
                component={RouterLink}
                to="/projects"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 44,
                  mt: 1,
                  fontSize: '0.9rem',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  animationDelay: fadeDelay(3),
                }}
              >
                {deployedProjects
                  .slice(0, MOBILE_PROJECT_NAME_COUNT)
                  .map((project) => project.title)
                  .join(' · ')}
                &nbsp;→
              </Typography>
            )}
          </Grid>
          {!isMobile && (
            <Grid
              size={isTwoColumn ? 5 : 12}
              sx={{
                mt: isTwoColumn ? 0 : 6,
              }}
            >
              {/* 데이터를 불러오는 동안 카드와 같은 크기의 자리 표시를 두어 로딩 후 레이아웃이 흔들리지 않게 한다. */}
              {status === 'loading' && (
                <Box sx={{ maxWidth: isTwoColumn ? 'none' : 560 }} aria-hidden="true">
                  <Skeleton variant="rectangular" sx={{ width: '100%', height: 'auto', aspectRatio: '16 / 9' }} />
                  <Skeleton variant="rectangular" height={CARD_INFO_HEIGHT} />
                </Box>
              )}
              {featuredProject && (
                <Box
                  className="hero-fade"
                  sx={{
                    maxWidth: isTwoColumn ? 'none' : 560,
                    animationDelay: fadeDelay(2),
                  }}
                >
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
          )}
        </Grid>
      </Container>
      <ButtonBase
        className="hero-fade"
        onClick={handleScrollDown}
        aria-label="Scroll, 다음 섹션으로 이동"
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: isMobile ? 16 : 28,
          ml: '-32px',
          width: 64,
          minHeight: 44,
          flexDirection: 'column',
          gap: 0.5,
          color: 'text.secondary',
          borderRadius: 1,
          animationDelay: fadeDelay(4),
          transition: 'color 0.2s ease',
          '&:hover': { color: 'accent.text' },
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
