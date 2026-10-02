import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import { GITHUB_URL } from '../../utils/contact-info.js';
import { LAST_UPDATED, SITE_OWNER } from '../../utils/site-info.js';

/**
 * Footer 컴포넌트
 *
 * 모든 페이지 하단에 표시되는 푸터. 저작권, 마지막 갱신 시점(Last updated), GitHub 링크를 보여준다.
 * 계속 다듬어 가는 포트폴리오라는 신호를 주기 위해 갱신 시점을 노출한다.
 */
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        px: { xs: 2, md: 6 },
        py: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: 'xl',
          mx: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
          © {new Date().getFullYear()} {SITE_OWNER}. All rights reserved. · Last updated {LAST_UPDATED}
        </Typography>
        <Box
          component="a"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub (새 탭에서 열기)"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            minHeight: 44,
            color: 'text.secondary',
            fontSize: '0.85rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            '&:hover': { color: 'accent.text' },
          }}
        >
          <GitHubIcon fontSize="small" />
          GitHub
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
