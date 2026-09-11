import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

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
            borderRadius: 4,
            borderLeft: '4px solid',
            borderLeftColor: 'primary.main',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.32)',
            },
          }}
        >
          <CardContent sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 5 } }}>
            <Grid container spacing={4} alignItems="center">
              <Grid
                size={{ xs: 12, md: 3 }}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Avatar
                  sx={{
                    width: { xs: 88, md: 108 },
                    height: { xs: 88, md: 108 },
                    background:
                      'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                  }}
                >
                  <PersonRoundedIcon sx={{ fontSize: { xs: 44, md: 56 } }} />
                </Avatar>
              </Grid>
              <Grid size={{ xs: 12, md: 9 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 1.5,
                  }}
                >
                  About Me
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.7,
                    color: 'text.secondary',
                    mb: 3,
                  }}
                >
                  여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기'
                  버튼이 들어갈 예정입니다.
                </Typography>
                <Button component={RouterLink} to="/about" variant="contained" color="primary">
                  더 알아보기
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AboutSection;
