import * as React from 'react';

/**
 * 포트폴리오 데이터(About Me 기본 정보/콘텐츠/스킬)를 공유하는 Context
 *
 * 값: { aboutMeData, setAboutMeData, homeData }
 * PortfolioProvider가 값을 제공하고, usePortfolio 훅으로 읽는다.
 */
const PortfolioContext = React.createContext(null);

export default PortfolioContext;
