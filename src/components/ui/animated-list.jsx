import * as React from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

/** Magic UI Animated List와 같은 스프링 설정 */
const SPRING = { type: 'spring', stiffness: 350, damping: 40 };

/**
 * AnimatedList 컴포넌트
 *
 * Magic UI의 Animated List를 MUI 프로젝트에 맞게 옮긴 컴포넌트.
 * 항목이 위에서부터 스프링 모션으로 쏙 나타나고(scale + opacity), 새 항목이 들어오면
 * 기존 항목은 부드럽게 밀려 내려가며(layout), 사라지는 항목은 퇴장 모션을 거친다.
 *
 * - 처음 마운트될 때 있던 항목들은 delay 간격으로 위에서부터 차례로 등장한다.
 *   이후에 추가되는 항목(새 글, 더보기)은 지연 없이 바로 스프링으로 등장하고, 기존 항목은 밀려 내려간다.
 * - 모션 줄이기(prefers-reduced-motion) 설정에서는 애니메이션 없이 바로 표시한다.
 * - 각 자식은 고유한 key가 있어야 한다.
 *
 * Props:
 * @param {node} children - 목록 항목들 (각각 key 필수) [Required]
 * @param {number} delay - 처음 나타나는 항목 사이의 간격(ms) [Optional, 기본값: 90]
 * @param {number} gap - 항목 사이 간격 (theme.spacing 단위) [Optional, 기본값: 3]
 *
 * Example usage:
 * <AnimatedList delay={100} gap={2}>
 *   {items.map((item) => <Card key={item.id} {...item} />)}
 * </AnimatedList>
 */
function AnimatedList({ children, delay = 90, gap = 3 }) {
  const isReducedMotion = useReducedMotion();
  const items = React.Children.toArray(children);

  /* 처음 마운트될 때 있던 항목만 위에서부터 차례로 등장시킨다. 이후 추가되는 항목은 바로 등장한다. */
  const [initialKeys] = React.useState(() => new Set(items.map((item) => item.key)));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap }}>
      <AnimatePresence initial>
        {items.map((item, index) => (
          <motion.div
            key={item.key}
            layout={!isReducedMotion}
            initial={isReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, originY: 0 }}
            exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            transition={{ ...SPRING, delay: initialKeys.has(item.key) ? (index * delay) / 1000 : 0 }}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}

export default AnimatedList;
