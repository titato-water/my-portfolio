import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import SectionHeading from '../ui/section-heading.jsx';

/**
 * Skill Tree 섹션
 *
 * 기술 스택 시각화(트리 또는 프로그레스바)가 들어갈 자리를 안내하는 플레이스홀더 섹션.
 */
function SkillTreeSection() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        backgroundColor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <SectionHeading label="Skill Tree" index="03" total="05" />
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
          여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로
          시각화할 예정입니다.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            py: { xs: 4, md: 5 },
            px: 3,
            color: 'text.disabled',
          }}
        >
          <AccountTreeRoundedIcon fontSize="small" />
          <Typography sx={{ fontSize: '0.9rem' }}>
            시각화 영역 (Coming soon)
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
