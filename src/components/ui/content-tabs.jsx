import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

/**
 * 내용을 첫 문장(강조용)과 나머지로 나눈다.
 *
 * @param {string} content - 전체 내용
 * @returns {{ lead: string, rest: string }}
 */
function splitLead(content) {
  const [lead, ...rest] = content.split(/(?<=\.)\s+/);
  return { lead, rest: rest.join(' ') };
}

/**
 * ContentTabs 컴포넌트
 *
 * 제목을 번호가 붙은 탭으로 나열하고, 선택된 탭의 내용을 아래에 보여주는 콘텐츠 탭.
 * 내용의 첫 문장은 크게 강조하고 나머지는 본문으로 표시한다.
 *
 * Props:
 * @param {Array<{id: string, title: string, content: string}>} sections - 탭으로 보여줄 섹션 목록 [Required]
 *
 * Example usage:
 * <ContentTabs sections={sections} />
 */
function ContentTabs({ sections }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeSection = sections[activeIndex];
  const { lead, rest } = activeSection ? splitLead(activeSection.content) : {};

  return (
    <Box>
      <Tabs
        value={activeIndex}
        onChange={(event, nextIndex) => setActiveIndex(nextIndex)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="자기소개 콘텐츠"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          '& .MuiTab-root': {
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            fontWeight: 600,
            px: { xs: 2, md: 3 },
            py: 2,
          },
          '& .MuiTabs-indicator': { backgroundColor: 'accent.main', height: 3 },
          '& .Mui-selected': { color: 'accent.main' },
        }}
      >
        {sections.map((section, index) => (
          <Tab
            key={section.id}
            label={`${String(index + 1).padStart(2, '0')}  ${section.title}`}
            id={`content-tab-${section.id}`}
            aria-controls={`content-panel-${section.id}`}
            value={index}
          />
        ))}
      </Tabs>
      {activeSection && (
        <Fade in key={activeSection.id} timeout={400}>
          <Box
            role="tabpanel"
            id={`content-panel-${activeSection.id}`}
            aria-labelledby={`content-tab-${activeSection.id}`}
            sx={{
              pt: { xs: 4, md: 6 },
              minHeight: { md: 220 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1.4rem', md: '2.2rem' },
                fontWeight: 700,
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                color: 'text.primary',
                maxWidth: 900,
                wordBreak: 'keep-all',
              }}
            >
              {lead}
            </Typography>
            {rest && (
              <Typography
                sx={{
                  mt: { xs: 2.5, md: 3.5 },
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  lineHeight: 1.9,
                  color: 'text.secondary',
                  maxWidth: 800,
                  wordBreak: 'keep-all',
                }}
              >
                {rest}
              </Typography>
            )}
          </Box>
        </Fade>
      )}
    </Box>
  );
}

export default ContentTabs;
