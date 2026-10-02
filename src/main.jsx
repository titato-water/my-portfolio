import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* 폰트 CSS는 페이지가 모두 로드된 뒤에 불러와, 첫 화면에 필요한 JS와 대역폭을 다투지 않게 한다. (그 전에는 시스템 폰트로 표시) */
window.addEventListener(
  'load',
  () => {
    import('pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css')
  },
  { once: true },
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
