import * as React from 'react';
import Box from '@mui/material/Box';

/**
 * RevealText 컴포넌트
 *
 * 글자가 한 글자씩 나타나는 타이핑 느낌의 텍스트.
 * - CSS 애니메이션 지연(animation-delay)만 사용하므로 JS 타이머가 없고, 글자 자리를 미리 차지해 레이아웃이 흔들리지 않는다.
 * - 단어 단위로 묶어(nowrap) 한글 줄바꿈이 단어 중간에서 끊기지 않는다.
 * - 스크린 리더에는 전체 문장이 한 번에 읽히고(aria-label), 모션 줄이기 설정에서는 애니메이션 없이 바로 보인다.
 *
 * Props:
 * @param {Array<Array<{text: string, isAccent?: boolean}>>} lines - 줄 목록. 각 줄은 단어 객체 배열 [Required]
 * @param {number} startDelay - 첫 글자가 나타나기 전 지연(초) [Optional, 기본값: 0.2]
 * @param {number} charDelay - 글자 사이 간격(초) [Optional, 기본값: 0.04]
 *
 * Example usage:
 * <RevealText lines={[[{ text: '안녕' }, { text: '하세요', isAccent: true }]]} />
 */
function RevealText({ lines, startDelay = 0.2, charDelay = 0.04 }) {
  const label = lines.map((line) => line.map((word) => word.text).join(' ')).join(' ');
  let charIndex = 0;

  return (
    <Box
      component="span"
      aria-label={label}
      sx={{
        '@keyframes reveal-char': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        '& .reveal-char': {
          opacity: 0,
          animation: 'reveal-char 0.01s linear forwards',
          '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
        },
      }}
    >
      {lines.map((line, lineIndex) => (
        <Box
          key={lineIndex}
          component="span"
          aria-hidden="true"
          sx={{ display: { md: 'block' } }}
        >
          {line.map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  color: word.isAccent ? 'accent.main' : 'inherit',
                }}
              >
                {Array.from(word.text).map((char) => {
                  const delay = startDelay + charIndex * charDelay;
                  charIndex += 1;

                  return (
                    <span
                      key={charIndex}
                      className="reveal-char"
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {char}
                    </span>
                  );
                })}
              </Box>
              {wordIndex < line.length - 1 && ' '}
            </React.Fragment>
          ))}
          {lineIndex < lines.length - 1 && ' '}
        </Box>
      ))}
    </Box>
  );
}

export default RevealText;
