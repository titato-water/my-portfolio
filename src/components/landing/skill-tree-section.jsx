import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SectionHeading from '../ui/section-heading.jsx';
import TextLink from '../ui/text-link.jsx';
import usePortfolio from '../../hooks/use-portfolio.js';
import { SKILL_ICONS } from '../../utils/skills-data.js';

/**
 * Skill Tree 섹션
 *
 * PortfolioContext의 홈 탭용 데이터(homeData)에서 숙련도 상위 스킬(4개)을
 * 아이콘 + 이름으로 보여주고, '전체 스킬 보기'로 About Me 페이지로 이동한다.
 */
function SkillTreeSection() {
  const { homeData } = usePortfolio();

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        backgroundColor: 'background.default',
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <SectionHeading label="Skill Tree" />
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
          가장 자신 있는 기술 스택입니다.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, md: 2 }, mb: 5 }}>
          {homeData.skills.map((skill) => {
            const iconInfo = SKILL_ICONS[skill.icon];
            const SkillIcon = iconInfo?.Icon;

            return (
              <Box
                key={skill.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  border: '1px solid transparent',
                  backgroundColor: 'background.paper',
                  borderRadius: 1,
                  px: { xs: 2.5, md: 3 },
                  py: { xs: 1.25, md: 1.5 },
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'accent.main',
                    color: 'accent.text',
                  },
                }}
              >
                {SkillIcon && (
                  <SkillIcon size={18} color={iconInfo.color ?? 'currentColor'} aria-hidden="true" />
                )}
                <Typography
                  sx={{
                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {skill.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <TextLink to="/about">전체 스킬 보기</TextLink>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
