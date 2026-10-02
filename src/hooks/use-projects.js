import * as React from 'react';
import { supabase } from '../lib/supabase.js';

const SELECT_COLUMNS =
  'id, title, description, tech_stack, detail_url, github_url, thumbnail_url, is_personal, role, period, highlights';

/**
 * 게시된(is_published) 프로젝트를 sort_order 순으로 불러오는 훅
 *
 * @returns {{ projects: object[], status: 'loading' | 'loaded' | 'error' }}
 *
 * Example usage:
 * const { projects, status } = useProjects();
 */
function useProjects() {
  const [projects, setProjects] = React.useState([]);
  const [status, setStatus] = React.useState('loading');

  React.useEffect(() => {
    let isCancelled = false;

    async function loadProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select(SELECT_COLUMNS)
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (isCancelled) return;

      if (error) {
        setStatus('error');
        return;
      }

      setProjects(data ?? []);
      setStatus('loaded');
    }

    loadProjects();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { projects, status };
}

export default useProjects;
