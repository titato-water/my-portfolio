import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import SectionHeading from '../ui/section-heading.jsx';
import GuestbookForm from './guestbook-form.jsx';
import GuestbookList from './guestbook-list.jsx';

const CONTACT_ITEMS = [
  { icon: EmailRoundedIcon, label: 'hsb052890@gmail.com', type: 'copy', value: 'hsb052890@gmail.com' },
  { icon: GitHubIcon, label: 'github.com/titato-water', type: 'link', href: 'https://github.com/titato-water' },
];

/**
 * Contact 섹션
 *
 * 연락처(이메일/GitHub) 영역과 방명록 작성/조회 영역으로 구성된 섹션.
 */
function ContactSection() {
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [copiedValue, setCopiedValue] = React.useState('');

  const handleGuestbookSubmitted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleCopy = (value) => async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(''), 1500);
    } catch {
      // 클립보드 API를 사용할 수 없는 환경에서는 조용히 무시한다.
    }
  };

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
      <Container maxWidth="xl" disableGutters>
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
          궁금한 점이 있으시면 언제든 연락해주세요. 방명록에 간단한 메시지를
          남겨주셔도 좋습니다.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 3, md: 6 }, mb: { xs: 8, md: 10 } }}>
          {CONTACT_ITEMS.map((item) => {
            const isCopied = item.type === 'copy' && copiedValue === item.value;
            const itemProps = item.type === 'copy'
              ? { component: 'button', type: 'button', onClick: handleCopy(item.value) }
              : { component: 'a', href: item.href, target: '_blank', rel: 'noopener noreferrer' };

            return (
              <Box
                key={item.label}
                {...itemProps}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: isCopied ? 'accent.main' : 'text.secondary',
                  textDecoration: 'none',
                  backgroundColor: 'transparent',
                  border: 'none',
                  p: 0,
                  font: 'inherit',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: 'accent.main' },
                }}
              >
                <item.icon fontSize="small" />
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  {isCopied ? '복사됨!' : item.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 6, md: 8 },
          }}
        >
          <Box>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', color: 'text.primary', mb: 3 }}>
              방명록 남기기
            </Typography>
            <GuestbookForm onSubmitted={handleGuestbookSubmitted} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', color: 'text.primary', mb: 3 }}>
              방명록
            </Typography>
            <GuestbookList refreshKey={refreshKey} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactSection;
