import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';

const CONTACT_ICONS = [EmailRoundedIcon, GitHubIcon, ChatBubbleRoundedIcon];

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
            lineHeight: 1.7,
            color: 'text.secondary',
            maxWidth: 520,
            mx: 'auto',
            mb: 3.5,
          }}
        >
          여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈
          예정입니다.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {CONTACT_ICONS.map((Icon, index) => (
            <Avatar
              key={index}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: 'accent.main',
              }}
            >
              <Icon fontSize="small" />
            </Avatar>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default ContactSection;
