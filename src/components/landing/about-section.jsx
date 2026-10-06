import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SectionHeading from '../ui/section-heading.jsx';
import TextLink from '../ui/text-link.jsx';
import usePortfolio from '../../hooks/use-portfolio.js';
import { SECTION_SCROLL_MARGIN } from '../../utils/scroll-to-section.js';

/**
 * About Me 섹션
 *
 * PortfolioContext의 홈 탭용 데이터(homeData)를 사용한다.
 * - 메인: showInHome 콘텐츠(개발 스토리/철학)의 첫 문장 요약 (최대 2줄)
 * - 사이드: 프로필 사진 + 기본 정보
 * - '더 알아보기' 링크로 About Me 페이지 이동
 * (스킬은 바로 아래 Skill Tree 섹션에서 보여준다.)
 */
function AboutSection() {
  const { homeData } = usePortfolio();
  const { basicInfo, content } = homeData;
  const infoItems = [
    { label: '학력', value: basicInfo.education },
    { label: '전공', value: basicInfo.major },
    { label: '경력', value: basicInfo.experience },
  ].filter((item) => item.value);

  return (
    <Box
      component="section"
      id="about"
      sx={{
        scrollMarginTop: SECTION_SCROLL_MARGIN,
        width: '100%',
        backgroundColor: 'background.paper',
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <SectionHeading label="About Me" />
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 4 }} sx={{ pr: { md: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Avatar
                src={basicInfo.photo || undefined}
                alt={`${basicInfo.name} 프로필 사진`}
                sx={{
                  width: { xs: 88, md: 120 },
                  height: { xs: 88, md: 120 },
                  backgroundColor: 'background.paper',
                  color: 'accent.text',
                  border: '2px solid',
                  borderColor: 'accent.main',
                }}
              >
                <PersonOutlineRoundedIcon sx={{ fontSize: { xs: 52, md: 72 } }} />
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: '1.5rem', md: '1.9rem' },
                    fontWeight: 800,
                    lineHeight: 1.2,
                    color: 'text.primary',
                  }}
                >
                  {basicInfo.name}
                </Typography>
                {basicInfo.role && (
                  <Typography
                    sx={{ mt: 0.5, fontSize: '0.95rem', fontWeight: 600, color: 'accent.text' }}
                  >
                    {basicInfo.role}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {infoItems.map((item) => (
                  <Box key={item.label}>
                    <Typography
                      variant="overline"
                      sx={{ color: 'text.disabled', lineHeight: 1.4 }}
                    >
                      {item.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
              {content.map((item) => (
                <Box key={item.id}>
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.6rem' },
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: 'text.primary',
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      lineHeight: 1.7,
                      color: 'text.secondary',
                      maxWidth: 640,
                      wordBreak: 'keep-all',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.summary}
                  </Typography>
                </Box>
              ))}
              <Box>
                <TextLink to="/about">더 알아보기</TextLink>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutSection;
