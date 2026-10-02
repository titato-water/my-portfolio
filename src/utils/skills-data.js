import { SiCss, SiFigma, SiGit, SiGithub, SiHtml5, SiJavascript, SiReact } from 'react-icons/si';

/**
 * 스킬 아이콘 사전
 * skillsData의 icon 키와 react-icons 브랜드 아이콘/색상을 연결한다. (color가 null이면 현재 글자색 사용)
 */
export const SKILL_ICONS = {
  html: { Icon: SiHtml5, color: '#E34F26' },
  css: { Icon: SiCss, color: '#1572B6' },
  javascript: { Icon: SiJavascript, color: '#F7DF1E' },
  react: { Icon: SiReact, color: '#61DAFB' },
  figma: { Icon: SiFigma, color: '#F24E1E' },
  git: { Icon: SiGit, color: '#F05032' },
  github: { Icon: SiGithub, color: null },
};

/** 카테고리별 구분 색상 */
export const CATEGORY_COLORS = {
  Frontend: '#e1251b',
  Framework: '#2f9bff',
  Design: '#a259ff',
  Tools: '#2ea043',
};

/** 정의되지 않은 카테고리에 쓰는 기본 색상 */
export const DEFAULT_CATEGORY_COLOR = '#8a8985';

/**
 * 기본 스킬 목록
 * - level: 숙련도(0~100)
 * - description: 호버 시 툴팁에 표시할 간단한 설명
 * - isMain: 메인(홈 탭 노출용) 스킬 여부
 */
export const skillsData = [
  {
    id: 1,
    icon: 'html',
    name: 'HTML',
    level: 80,
    category: 'Frontend',
    description: '시맨틱 마크업으로 구조가 명확한 페이지를 만들 수 있어요.',
    isMain: true,
  },
  {
    id: 2,
    icon: 'css',
    name: 'CSS',
    level: 75,
    category: 'Frontend',
    description: '반응형 레이아웃과 인터랙션 스타일링에 익숙해요.',
    isMain: true,
  },
  {
    id: 3,
    icon: 'javascript',
    name: 'JavaScript',
    level: 70,
    category: 'Frontend',
    description: 'ES6+ 문법으로 화면의 동작과 데이터 흐름을 구현해요.',
    isMain: true,
  },
  {
    id: 4,
    icon: 'react',
    name: 'React',
    level: 70,
    category: 'Framework',
    description: '함수형 컴포넌트와 Hooks로 재사용 가능한 UI를 만들어요.',
    isMain: true,
  },
  {
    id: 5,
    icon: 'figma',
    name: 'Figma',
    level: 65,
    category: 'Design',
    description: '화면 설계와 디자인을 보고 코드로 옮기는 데 활용해요.',
    isMain: false,
  },
  {
    id: 6,
    icon: 'github',
    name: 'GitHub',
    level: 60,
    category: 'Tools',
    description: '저장소 관리, GitHub Pages 배포와 Actions 자동화를 사용해요.',
    isMain: false,
  },
  {
    id: 7,
    icon: 'git',
    name: 'Git',
    level: 50,
    category: 'Tools',
    description: '커밋과 브랜치로 변경 이력을 관리해요.',
    isMain: false,
  },
];

/**
 * 숙련도 높은 순으로 정렬한 새 배열을 반환한다. (원본 유지)
 *
 * @param {Array<{level: number}>} skills - 스킬 목록
 * @returns {Array} 숙련도 내림차순 배열
 */
export function sortSkillsByLevel(skills) {
  return [...skills].sort((a, b) => b.level - a.level);
}

/**
 * 숙련도 상위 N개 스킬을 반환한다. (홈 탭 연동용)
 *
 * @param {Array<{level: number}>} skills - 스킬 목록
 * @param {number} count - 가져올 개수
 * @returns {Array} 상위 N개 스킬
 */
export function pickTopSkills(skills, count) {
  return sortSkillsByLevel(skills).slice(0, count);
}

/**
 * 메인 스킬(isMain: true)만 반환한다. (홈 탭 연동용)
 *
 * @param {Array<{isMain: boolean}>} skills - 스킬 목록
 * @returns {Array} 메인 스킬 배열
 */
export function pickMainSkills(skills) {
  return skills.filter((skill) => skill.isMain);
}

/**
 * 스킬을 카테고리별로 묶는다. (카테고리의 등장 순서 유지)
 *
 * @param {Array<{category: string}>} skills - 스킬 목록
 * @returns {Array<{category: string, skills: Array}>} 카테고리 그룹 배열
 */
export function groupSkillsByCategory(skills) {
  const groups = [];

  skills.forEach((skill) => {
    const group = groups.find((item) => item.category === skill.category);
    if (group) {
      group.skills.push(skill);
    } else {
      groups.push({ category: skill.category, skills: [skill] });
    }
  });

  return groups;
}
