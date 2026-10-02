import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

/**
 * ProjectCard 컴포넌트
 *
 * 왼쪽 16:9 썸네일, 오른쪽 프로젝트 정보로 구성된 가로형 카드.
 * 배포/GitHub 주소가 없으면 해당 버튼은 표시하지 않는다.
 *
 * Props:
 * @param {string} title - 프로젝트 제목 [Required]
 * @param {string} description - 한 줄 설명 [Optional, 기본값: '']
 * @param {string[]} techStack - 기술 스택 목록 [Optional, 기본값: []]
 * @param {string} detailUrl - 배포된 사이트 주소 [Optional]
 * @param {string} githubUrl - GitHub 저장소 주소 [Optional]
 * @param {string} thumbnailUrl - 썸네일 이미지 주소 [Optional]
 * @param {boolean} isPersonal - 개인 프로젝트 여부 [Optional, 기본값: true]
 * @param {string} role - 내 역할 (팀 프로젝트라면 담당 업무) [Optional, 기본값: '']
 * @param {string} period - 진행 기간 [Optional, 기본값: '']
 * @param {string[]} highlights - 주요 구현 내용(2~3개) [Optional, 기본값: []]
 *
 * Example usage:
 * <ProjectCard title="Devision" role="개인 프로젝트" highlights={['댓글 기능 구현']} detailUrl="https://example.com" />
 */
function ProjectCard({
  title,
  description = '',
  techStack = [],
  detailUrl,
  githubUrl,
  thumbnailUrl,
  isPersonal = true,
  role = '',
  period = '',
  highlights = [],
}) {
  const [isImageFailed, setIsImageFailed] = React.useState(false);
  const hasThumbnail = Boolean(thumbnailUrl) && !isImageFailed;

  return (
    <Box
      component="article"
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: 'background.paper',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: 8,
        },
      }}
    >
      <Grid container>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              backgroundColor: 'background.default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.disabled',
            }}
          >
            {hasThumbnail ? (
              <Box
                component="img"
                src={thumbnailUrl}
                alt={`${title} 스크린샷`}
                loading="lazy"
                onError={() => setIsImageFailed(true)}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <ImageNotSupportedOutlinedIcon sx={{ fontSize: 48 }} />
            )}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 2,
              p: { xs: 2.5, md: 4 },
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ color: 'accent.text', lineHeight: 1.6 }}
              >
                {isPersonal ? 'Personal' : 'Team'}
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: 'text.primary',
                }}
              >
                {title}
              </Typography>
            </Box>
            {description && (
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.6,
                  color: 'text.secondary',
                }}
              >
                {description}
              </Typography>
            )}
            {(role || period) && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 0.5, md: 2 }, rowGap: 0.5 }}>
                {role && (
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'text.primary' }}>
                    {role}
                  </Typography>
                )}
                {period && (
                  <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>{period}</Typography>
                )}
              </Box>
            )}
            {highlights.length > 0 && (
              <Box
                component="ul"
                aria-label={`${title} 주요 구현 내용`}
                sx={{ m: 0, p: 0, pl: 2.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}
              >
                {highlights.map((highlight) => (
                  <Box
                    key={highlight}
                    component="li"
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      lineHeight: 1.6,
                      color: 'text.secondary',
                      wordBreak: 'keep-all',
                      '&::marker': { color: 'accent.main' },
                    }}
                  >
                    {highlight}
                  </Box>
                ))}
              </Box>
            )}
            {techStack.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {techStack.map((tech) => (
                  <Chip key={tech} label={tech} size="small" variant="outlined" />
                ))}
              </Box>
            )}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 1 }}>
              {detailUrl && (
                <Button
                  variant="contained"
                  color="primary"
                  href={detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<OpenInNewRoundedIcon />}
                  sx={{
                    minHeight: 44,
                    transition: 'transform 0.15s ease',
                    '&:active': { transform: 'scale(0.96)' },
                  }}
                >
                  Live Demo
                </Button>
              )}
              {githubUrl && (
                <Button
                  variant="outlined"
                  color="inherit"
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                  sx={{
                    minHeight: 44,
                    transition: 'transform 0.15s ease',
                    '&:active': { transform: 'scale(0.96)' },
                  }}
                >
                  GitHub
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectCard;
