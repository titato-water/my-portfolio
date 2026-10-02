import * as React from 'react';
import PortfolioContext from '../contexts/portfolio-context.js';

/**
 * usePortfolio 훅
 *
 * PortfolioContext에서 About Me 데이터, 변경 함수(setAboutMeData), 홈 탭용 데이터(homeData)를 읽어온다.
 * PortfolioProvider 밖에서 호출하면 에러를 던진다.
 *
 * Example usage:
 * const { aboutMeData, homeData } = usePortfolio();
 */
function usePortfolio() {
  const context = React.useContext(PortfolioContext);

  if (!context) {
    throw new Error('usePortfolio는 PortfolioProvider 안에서만 사용할 수 있습니다.');
  }

  return context;
}

export default usePortfolio;
