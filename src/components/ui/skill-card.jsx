import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import { DEFAULT_CATEGORY_COLOR, SKILL_ICONS } from '../../utils/skills-data.js';

const growBar = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

/**
 * SkillCard 컴포넌트
 *
 * 아이콘 + 기술명 + 숙련도 퍼센트 바로 구성된 스킬 카드.
 * 호버하면 설명 툴팁이 나타나고, 진행 바는 마운트 시 왼쪽에서 채워지는 애니메이션이 실행된다.
 *
 * Props:
 * @param {string} name - 기술명 [Required]
 * @param {number} level - 숙련도 0~100 [Required]
 * @param {string} icon - SKILL_ICONS의 아이콘 키 [Optional]
 * @param {string} description - 호버 시 툴팁에 표시할 설명 [Optional, 기본값: '']
 * @param {string} color - 카테고리 구분 색상 [Optional, 기본값: 회색]
 * @param {boolean} isMain - 메인 스킬 여부 (MAIN 뱃지 표시) [Optional, 기본값: false]
 *
 * Example usage:
 * <SkillCard name="React" level={70} icon="react" color="#2f9bff" description="UI 라이브러리" />
 */
function SkillCard({
  name,
  level,
  icon,
  description = '',
  color = DEFAULT_CATEGORY_COLOR,
  isMain = false,
}) {
  const iconInfo = SKILL_ICONS[icon];
  const SkillIcon = iconInfo?.Icon;

  return (
    <Tooltip title={description} arrow placement="top" disableInteractive>
      <Box
        sx={{
          height: '100%',
          border: '1px solid transparent',
          borderRadius: 1,
          backgroundColor: 'background.paper',
          p: { xs: 2, md: 2.5 },
          transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            borderColor: color,
            transform: 'translateY(-3px)',
            boxShadow: 4,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          {SkillIcon && (
            <SkillIcon size={26} color={iconInfo.color ?? 'currentColor'} aria-hidden="true" />
          )}
          <Typography
            sx={{
              flexGrow: 1,
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            {name}
          </Typography>
          {isMain && (
            <Chip
              label="MAIN"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                color: '#fff',
                backgroundColor: color,
              }}
            />
          )}
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color }}>{level}%</Typography>
        </Box>
        <Box
          role="progressbar"
          aria-label={`${name} 숙련도`}
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'divider',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: `${level}%`,
              height: '100%',
              borderRadius: 4,
              backgroundColor: color,
              transformOrigin: 'left center',
              animation: `${growBar} 1s cubic-bezier(0.22, 1, 0.36, 1) both`,
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          />
        </Box>
      </Box>
    </Tooltip>
  );
}

export default React.memo(SkillCard);
