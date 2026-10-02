import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

/**
 * TextLink 컴포넌트
 *
 * 밑줄과 화살표 아이콘으로 구성된 에디토리얼 스타일의 텍스트 링크.
 * 눈에 보이는 밑줄은 글자 바로 아래에 두고, 눌리는 영역은 높이 44px 이상으로 확보한다.
 *
 * Props:
 * @param {string} to - 이동할 라우트 경로 [Required]
 * @param {node} children - 링크에 표시할 텍스트 [Required]
 *
 * Example usage:
 * <TextLink to="/about">더 알아보기</TextLink>
 */
function TextLink({ to, children }) {
  return (
    <Box
      component={RouterLink}
      to={to}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: 44,
        color: 'text.primary',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        transition: 'color 0.2s ease',
        '&:hover': {
          color: 'accent.text',
          '& .text-link-label': { borderColor: 'accent.main' },
          '& .text-link-icon': { transform: 'translateX(4px)' },
        },
      }}
    >
      <Box
        component="span"
        className="text-link-label"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          pb: 0.5,
          borderBottom: '1px solid',
          borderColor: 'rgba(184, 196, 206, 0.35)',
          transition: 'border-color 0.2s ease',
        }}
      >
        {children}
        <ArrowForwardRoundedIcon
          className="text-link-icon"
          fontSize="small"
          sx={{ transition: 'transform 0.2s ease' }}
        />
      </Box>
    </Box>
  );
}

export default TextLink;
