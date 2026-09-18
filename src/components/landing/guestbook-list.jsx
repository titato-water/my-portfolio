import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { supabase } from '../../lib/supabase.js';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * GuestbookList 컴포넌트
 *
 * 등록된 방명록을 최신순으로 보여준다. 이메일/전화번호가 없는 공개 뷰(guestbook_public)만 조회한다.
 *
 * Props:
 * @param {number} refreshKey - 값이 바뀔 때마다 목록을 다시 불러오기 위한 트리거 [Optional, 기본값: 0]
 *
 * Example usage:
 * <GuestbookList refreshKey={refreshKey} />
 */
function GuestbookList({ refreshKey = 0 }) {
  const [entries, setEntries] = React.useState([]);
  const [status, setStatus] = React.useState('loading');

  React.useEffect(() => {
    let isCancelled = false;

    async function fetchEntries() {
      setStatus('loading');
      const { data, error } = await supabase
        .from('guestbook_public')
        .select('id, name, message, region, age_group, emoji, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      if (isCancelled) return;

      if (error) {
        setStatus('error');
        return;
      }

      setEntries(data ?? []);
      setStatus('loaded');
    }

    fetchEntries();

    return () => {
      isCancelled = true;
    };
  }, [refreshKey]);

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
    </Box>
  );
}

export default GuestbookList;
