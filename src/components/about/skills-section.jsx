import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SkillCard from '../ui/skill-card.jsx';
import {
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
  groupSkillsByCategory,
  skillsData,
} from '../../utils/skills-data.js';

/**
 * SkillsSection 컴포넌트
 *
 * 스킬을 카테고리별로 묶어 카드 그리드로 보여준다.
 * - 그리드: 모바일 1열 / 태블릿 2열 / 데스크탑 3열
 *
 * Props:
 * @param {Array} skills - 표시할 스킬 목록 [Optional, 기본값: skillsData]
 *
 * Example usage:
 * <SkillsSection skills={skills} />
 */
function SkillsSection({ skills = skillsData }) {
  const groups = groupSkillsByCategory(skills);

  return (
    <Box component="section" aria-label="스킬">
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="overline" sx={{ color: 'accent.text', lineHeight: 1.6 }}>
          Skills
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            fontWeight: 800,
            letterSpacing: '-0.01em',
            color: 'text.primary',
          }}
        >
          기술 스택 &amp; 숙련도
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 5 } }}>
        {groups.map((group) => {
          const color = CATEGORY_COLORS[group.category] ?? DEFAULT_CATEGORY_COLOR;

          return (
            <Box key={group.category}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
                <Box
                  aria-hidden="true"
                  sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }}
                />
                <Typography
                  component="h3"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.15rem' },
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: 'text.primary',
                  }}
                >
                  {group.category}
                </Typography>
              </Box>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {group.skills.map((skill) => (
                  <Grid key={skill.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <SkillCard
                      name={skill.name}
                      level={skill.level}
                      icon={skill.icon}
                      description={skill.description}
                      color={color}
                      isMain={skill.isMain}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default SkillsSection;
