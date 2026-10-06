import * as React from 'react';
import Box from '@mui/material/Box';

/**
 * ReadingProgressBar 컴포넌트
 *
 * 화면 맨 위에 고정된 3px 높이의 읽기 진행률 바.
 * 폭을 바꾸지 않고 transform(scaleX)만 쓰며, 값은 useScrollNavigation 훅이 ref로 직접 갱신한다.
 * 보조 시각 요소이므로 스크린 리더에는 숨긴다.
 *
 * Props:
 * @param {object} barRef - 진행률을 그릴 요소에 연결할 ref (useScrollNavigation의 progressBarRef) [Required]
 *
 * Example usage:
 * <ReadingProgressBar barRef={progressBarRef} />
 */
function ReadingProgressBar({ barRef }) {
  return (
    <Box
      aria-hidden="true"
      sx={(theme) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 3,
        zIndex: theme.zIndex.drawer + 2,
        pointerEvents: 'none',
      })}
    >
      <Box
        ref={barRef}
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'accent.main',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </Box>
  );
}

export default ReadingProgressBar;
