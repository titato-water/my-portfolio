import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextLink from '../components/ui/text-link.jsx';

/**
 * NotFound 페이지
 *
 * 존재하지 않는 주소로 들어왔을 때 보여주는 안내 페이지. 홈으로 돌아가는 링크를 제공한다.
 */
function NotFound() {
  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default',
        px: { xs: 2, md: 6 },
        py: { xs: 10, md: 16 },
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Typography variant="overline" sx={{ color: 'accent.text' }}>
          404
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '2.25rem', md: '4rem' },
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'text.primary',
            mt: 1,
            mb: 2,
            wordBreak: 'keep-all',
          }}
        >
          페이지를 찾을 수 없어요
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.7,
            color: 'text.secondary',
            maxWidth: 520,
            mb: 4,
            wordBreak: 'keep-all',
          }}
        >
          주소가 바뀌었거나 없는 페이지예요. 홈에서 다시 둘러봐 주세요.
        </Typography>
        <TextLink to="/">홈으로 돌아가기</TextLink>
      </Container>
    </Box>
  );
}

export default NotFound;
