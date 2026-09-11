import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/**
 * About Me 섹션
 *
 * 간단한 자기소개와 About Me 페이지로 이동하는 '더 알아보기' 버튼을 제공하는 플레이스홀더 섹션.
 */
function AboutSection() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <CardContent sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 5 } }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                color: 'text.primary',
                mb: 2,
              }}
            >
              About Me
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
                color: 'text.secondary',
                mb: 3,
              }}
            >
              여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기'
              버튼이 들어갈 예정입니다.
            </Typography>
            <Button
              component={RouterLink}
              to="/about"
              variant="contained"
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.light' },
              }}
            >
              더 알아보기
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AboutSection;
