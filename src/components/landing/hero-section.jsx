import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import FeaturedProjectCard from '../ui/featured-project-card.jsx';
import usePortfolio from '../../hooks/use-portfolio.js';
import useProjects from '../../hooks/use-projects.js';

const GITHUB_URL = 'https://github.com/titato-water';

/** 모션 줄이기 설정을 켠 사용자는 모든 애니메이션을 끈다. */
const REDUCED_MOTION = '@media (prefers-reduced-motion: reduce)';

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
 * 구성: 이름 · 직무 · 지역 오버라인 / 임팩트 헤드라인 / 근거 한 줄 서브카피 /
 * CTA(프로젝트 보기 + 연락하기 + GitHub) / 대표 프로젝트 카드(데스크탑) / DONE 카운터.
 * 이름과 직무는 PortfolioContext, 프로젝트와 완료 수는 Supabase 데이터에서 가져온다.
 */
function HeroSection() {
  const { aboutMeData } = usePortfolio();
  const { projects, status } = useProjects();
  const { name, role } = aboutMeData.basicInfo;
  const isLoaded = status === 'loaded';
  const featuredProject = isLoaded ? projects[0] : undefined;

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: 'background.default',
        px: { xs: 2, md: 6 },
        py: { xs: 10, md: 16 },
        '@keyframes hero-fade-up': {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes hero-blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.25 },
        },
        '& .hero-fade': {
          animation: 'hero-fade-up 0.6s ease-out both',
          [REDUCED_MOTION]: { animation: 'none' },
        },
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 0, md: 8 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              className="hero-fade"
              variant="overline"
              sx={{ display: 'block', color: 'accent.main', mb: { xs: 2, md: 3 } }}
            >
              {name} · {role}
            </Typography>
            <Typography
              className="hero-fade"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'text.primary',
                mb: { xs: 3, md: 4 },
                wordBreak: 'keep-all',
                animationDelay: '0.08s',
              }}
            >
              <Box component="span" sx={{ display: { md: 'block' } }}>
                디자인과 기능이 만나는{' '}
              </Box>
              지점을 만듭니다.
            </Typography>
            <Typography
              className="hero-fade"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                lineHeight: 1.6,
                color: 'text.secondary',
                maxWidth: 560,
                mb: { xs: 4, md: 5 },
                wordBreak: 'keep-all',
                animationDelay: '0.16s',
              }}
            >
              React로 직접 만들고 배포합니다. 소통하며 끝까지 마무리하는 신입
              프론트엔드 개발자입니다.
            </Typography>
            <Box
              className="hero-fade"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: { xs: 1, md: 2 },
                animationDelay: '0.24s',
              }}
            >
              <Button
                component={RouterLink}
                to="/projects"
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4, fontWeight: 700 }}
              >
                프로젝트 보기
              </Button>
              <Button
                onClick={scrollToContact}
                color="inherit"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{ fontWeight: 600, color: 'text.primary' }}
              >
                연락하기
              </Button>
              <Button
                component="a"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="large"
                startIcon={<GitHubIcon />}
                sx={{ fontWeight: 600, color: 'text.primary' }}
              >
                GitHub
              </Button>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: { xs: 'none', md: 'block' }, minHeight: { md: 280 } }}
          >
            {featuredProject && (
              <Box className="hero-fade" sx={{ animationDelay: '0.32s' }}>
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
        <Box
          className="hero-fade"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 1.5,
            mt: { xs: 8, md: 12 },
            minHeight: 24,
            color: 'text.secondary',
            animationDelay: '0.4s',
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'accent.main',
              animation: 'hero-blink 2.4s ease-in-out infinite',
              [REDUCED_MOTION]: { animation: 'none' },
            }}
          />
          <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
            {isLoaded && `완료한 프로젝트 ${projects.length}개 · `}
            지금 새 기회에 열려 있어요
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: { xs: 4, md: 6 },
            color: 'text.secondary',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(6px)' },
            },
          }}
        >
          <Typography variant="overline">Scroll</Typography>
          <KeyboardArrowDownRoundedIcon
            fontSize="small"
            sx={{
              animation: 'bounce 2s ease-in-out infinite',
              [REDUCED_MOTION]: { animation: 'none' },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
