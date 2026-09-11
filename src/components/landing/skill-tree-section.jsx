import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';

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
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mx: 'auto',
            mb: 2.5,
            backgroundColor: 'rgba(242, 226, 5, 0.15)',
            color: 'accent.main',
          }}
        >
          <AccountTreeRoundedIcon fontSize="medium" />
        </Avatar>
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
            lineHeight: 1.7,
            color: 'text.secondary',
            maxWidth: 520,
            mx: 'auto',
            mb: 3,
          }}
        >
          여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로
          시각화할 예정입니다.
        </Typography>
        <Box
          sx={{
            border: '1.5px dashed rgba(242, 226, 5, 0.35)',
            borderRadius: 3,
            py: { xs: 3, md: 4 },
            px: 2,
            color: 'text.disabled',
            fontSize: '0.9rem',
          }}
        >
          시각화 영역 (Coming soon)
        </Box>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
