import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SectionHeading from '../ui/section-heading.jsx';

const CONTACT_ITEMS = [
  { icon: EmailRoundedIcon, label: 'Email' },
  { icon: GitHubIcon, label: 'GitHub' },
  { icon: ChatBubbleOutlineRoundedIcon, label: 'Message' },
];

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
        backgroundColor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <SectionHeading label="Contact" index="05" total="05" />
        <Typography
          sx={{
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            fontWeight: 700,
            letterSpacing: '-0.01em',
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
            maxWidth: 560,
            mb: 5,
          }}
        >
          여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈
          예정입니다.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 3, md: 6 } }}>
          {CONTACT_ITEMS.map(({ icon: Icon, label }) => (
            <Box
              key={label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'accent.main' },
              }}
            >
              <Icon fontSize="small" />
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 600 }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default ContactSection;
