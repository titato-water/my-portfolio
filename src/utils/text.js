/**
 * 텍스트의 첫 문장(마침표 기준)을 반환한다. 마침표가 없으면 전체를 반환한다.
 *
 * @param {string} text - 원본 텍스트
 * @returns {string} 첫 문장
 */
export function firstSentence(text) {
  return text.trim().split(/(?<=\.)\s+/)[0];
}

/**
 * 텍스트를 지정한 길이로 줄이고, 잘렸을 때만 말줄임표(...)를 붙인다.
 *
 * @param {string} text - 원본 텍스트
 * @param {number} maxLength - 최대 글자 수 [기본값: 100]
 * @returns {string} 요약된 텍스트
 */
export function summarize(text, maxLength = 100) {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength).trimEnd()}...`;
}
