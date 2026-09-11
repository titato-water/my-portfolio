import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'background.paper',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
          }}
        >
          Skill Tree
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6,
            color: 'text.secondary',
          }}
        >
          여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로
          시각화할 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
