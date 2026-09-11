import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * Contact 섹션
 *
 * 연락처, SNS, 메시지 폼이 들어갈 자리를 안내하는 플레이스홀더 섹션.
 */
function ContactSection() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'secondary.main',
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
          Contact
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6,
            color: 'text.secondary',
          }}
        >
          여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈
          예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default ContactSection;
