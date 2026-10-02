import * as React from 'react';
import initialAboutMe from '../utils/about-me-data.js';
import { pickTopSkills, skillsData } from '../utils/skills-data.js';
import { firstSentence, summarize } from '../utils/text.js';
import PortfolioContext from './portfolio-context.js';

const HOME_SKILL_COUNT = 4;
const HOME_SUMMARY_LENGTH = 100;

/**
 * PortfolioProvider 컴포넌트
 *
 * About Me 데이터를 상태로 보관하고, 홈 탭용 데이터(homeData)를 자동으로 만들어 하위 컴포넌트에 제공한다.
 * - 홈 탭 요약은 각 콘텐츠의 첫 문장만 사용한다. (너무 길면 100자에서 말줄임)
 * - setAboutMeData로 데이터를 바꾸면 homeData가 다시 계산되어 홈 탭에도 즉시 반영된다.
 * - homeData / 컨텍스트 값은 useMemo로 메모이제이션해 불필요한 리렌더링을 줄인다.
 *
 * Props:
 * @param {node} children - Provider 하위에 렌더링할 요소 [Required]
 *
 * Example usage:
 * <PortfolioProvider><App /></PortfolioProvider>
 */
function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = React.useState(() => ({
    ...initialAboutMe,
    skills: skillsData,
  }));

  /** 홈 탭용 데이터: showInHome 콘텐츠 요약 + 숙련도 상위 스킬 + 기본 정보 */
  const homeData = React.useMemo(
    () => ({
      basicInfo: aboutMeData.basicInfo,
      content: aboutMeData.sections
        .filter((section) => section.showInHome)
        .map((section) => ({
          id: section.id,
          title: section.title,
          summary: summarize(firstSentence(section.content), HOME_SUMMARY_LENGTH),
        })),
      skills: pickTopSkills(aboutMeData.skills, HOME_SKILL_COUNT),
    }),
    [aboutMeData],
  );

  const value = React.useMemo(
    () => ({ aboutMeData, setAboutMeData, homeData }),
    [aboutMeData, homeData],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export default PortfolioProvider;
