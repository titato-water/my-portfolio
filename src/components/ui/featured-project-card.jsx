import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

/** 카드에 표시할 기술 스택 칩의 최대 개수 */
const MAX_TECH_CHIPS = 3;

/**
 * FeaturedProjectCard 컴포넌트
 *
 * Hero에서 대표 프로젝트 하나를 미리 보여 주는 카드. 16:9 썸네일, 제목, 한 줄 설명, 기술 스택(최대 3개)을 보여준다.
 * href가 있으면 새 탭으로 열리는 외부 링크, 없으면 내부 /projects 페이지로 이동한다.
 *
 * Props:
 * @param {string} title - 프로젝트 제목 [Required]
 * @param {string} description - 한 줄 설명 [Optional, 기본값: '']
 * @param {string[]} techStack - 기술 스택 목록 [Optional, 기본값: []]
 * @param {string} thumbnailUrl - 썸네일 이미지 주소 [Optional]
 * @param {string} href - 배포된 사이트 주소 (없으면 /projects로 이동) [Optional]
 * @param {string} label - 카드 위에 표시할 라벨 [Optional, 기본값: 'Featured Project']
 *
 * Example usage:
 * <FeaturedProjectCard title="Devision" href="https://example.com" thumbnailUrl="/thumb.png" />
 */
function FeaturedProjectCard({
  title,
  description = '',
  techStack = [],
  thumbnailUrl,
  href,
  label = 'Featured Project',
}) {
  const [isImageFailed, setIsImageFailed] = React.useState(false);
  const hasThumbnail = Boolean(thumbnailUrl) && !isImageFailed;
  const linkProps = href
    ? { component: 'a', href, target: '_blank', rel: 'noopener noreferrer' }
    : { component: RouterLink, to: '/projects' };

  return (
    <Box
      {...linkProps}
      sx={{
        position: 'relative',
        display: 'block',
        color: 'inherit',
        textDecoration: 'none',
        borderRadius: 1,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        boxShadow: 2,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8,
          '& .featured-arrow': { opacity: 1, transform: 'translate(0, 0)' },
        },
      }}
    >
      <Box
        sx={{
          aspectRatio: '16 / 9',
          backgroundColor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
        }}
      >
        {hasThumbnail ? (
          <Box
            component="img"
            src={thumbnailUrl}
            alt={`${title} 스크린샷`}
            onError={() => setIsImageFailed(true)}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <ImageNotSupportedOutlinedIcon sx={{ fontSize: 40 }} />
        )}
      </Box>
      <Box sx={{ p: { xs: 2.5, md: 3 } }}>
        <Typography variant="overline" sx={{ color: 'accent.text', lineHeight: 1.6 }}>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Typography
            component="p"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.6rem' },
              fontWeight: 700,
              lineHeight: 1.3,
              color: 'text.primary',
            }}
          >
            {title}
          </Typography>
          <ArrowOutwardRoundedIcon
            className="featured-arrow"
            sx={{
              color: 'accent.text',
              opacity: 0,
              transform: 'translate(-4px, 4px)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
          />
        </Box>
        {description && (
          <Typography
            sx={{
              mt: 0.5,
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: 'text.secondary',
              wordBreak: 'keep-all',
            }}
          >
            {description}
          </Typography>
        )}
        {techStack.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 2 }}>
            {techStack.slice(0, MAX_TECH_CHIPS).map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{ backgroundColor: 'background.default', color: 'text.secondary' }}
              />
            ))}
          </Box>
        )}
        {href && (
          /* 새 탭으로 열린다는 안내를 스크린 리더에만 전달한다. (링크 이름이 보이는 글자를 포함하도록 aria-label 대신 사용) */
          <Box
            component="span"
            sx={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
              whiteSpace: 'nowrap',
            }}
          >
            (새 탭에서 열기)
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default FeaturedProjectCard;
