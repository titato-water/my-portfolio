import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { supabase } from '../../lib/supabase.js';

const PAGE_SIZE = 5;
const SELECT_COLUMNS = 'id, name, message, region, age_group, emoji, created_at';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

async function fetchPage(offset) {
  return supabase
    .from('guestbook_public')
    .select(SELECT_COLUMNS)
    .order('created_at', { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);
}

/**
 * GuestbookList 컴포넌트
 *
 * 등록된 방명록을 최신순으로 페이지 단위(5개씩)로 보여주고, '더보기' 버튼으로 추가 열람할 수 있다.
 * 이메일/전화번호가 없는 공개 뷰(guestbook_public)만 조회한다.
 *
 * Props:
 * @param {number} refreshKey - 값이 바뀔 때마다 목록을 처음부터 다시 불러오기 위한 트리거 [Optional, 기본값: 0]
 *
 * Example usage:
 * <GuestbookList refreshKey={refreshKey} />
 */
function GuestbookList({ refreshKey = 0 }) {
  const [entries, setEntries] = React.useState([]);
  const [status, setStatus] = React.useState('loading');
  const [hasMore, setHasMore] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);

  React.useEffect(() => {
    let isCancelled = false;

    async function loadFirstPage() {
      setStatus('loading');
      const { data, error } = await fetchPage(0);

      if (isCancelled) return;

      if (error) {
        setStatus('error');
        return;
      }

      setEntries(data ?? []);
      setHasMore((data?.length ?? 0) === PAGE_SIZE);
      setStatus('loaded');
    }

    loadFirstPage();

    return () => {
      isCancelled = true;
    };
  }, [refreshKey]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const { data, error } = await fetchPage(entries.length);

    if (!error) {
      setEntries((prev) => [...prev, ...(data ?? [])]);
      setHasMore((data?.length ?? 0) === PAGE_SIZE);
    }

    setLoadingMore(false);
  };

  if (status === 'loading') {
    return (
      <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
        방명록을 불러오는 중입니다...
      </Typography>
    );
  }

  if (status === 'error') {
    return (
      <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
        방명록을 불러오지 못했습니다.
      </Typography>
    );
  }

  if (entries.length === 0) {
    return (
      <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
        아직 등록된 방명록이 없습니다. 첫 방명록을 남겨보세요!
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {entries.map((entry) => (
        <Box
          key={entry.id}
          sx={{
            pb: 3,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
            {entry.emoji && <Box component="span">{entry.emoji}</Box>}
            <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>
              {entry.name}
            </Typography>
            {(entry.region || entry.age_group) && (
              <Typography sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {[entry.region, entry.age_group].filter(Boolean).join(' · ')}
              </Typography>
            )}
            <Typography sx={{ fontSize: '0.8rem', color: 'text.disabled', ml: 'auto' }}>
              {formatDate(entry.created_at)}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'text.secondary' }}>
            {entry.message}
          </Typography>
        </Box>
      ))}
      {hasMore && (
        <Box
          component="button"
          type="button"
          onClick={handleLoadMore}
          disabled={loadingMore}
          sx={{
            alignSelf: 'flex-start',
            backgroundColor: 'transparent',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            px: 2.5,
            py: 1,
            color: 'text.secondary',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease, color 0.2s ease',
            '&:hover': {
              borderColor: 'accent.main',
              color: 'accent.main',
            },
          }}
        >
          {loadingMore ? '불러오는 중...' : '더보기'}
        </Box>
      )}
    </Box>
  );
}

export default GuestbookList;
