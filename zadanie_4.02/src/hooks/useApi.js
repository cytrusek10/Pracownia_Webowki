import { useState, useEffect } from 'react';

const BASE = 'https://jsonplaceholder.typicode.com';

function useFetch(url) {
  const [data, setData]       = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError]   = useState(false);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(url)
      .then(r => { if (!r.ok) throw new Error('Network error'); return r.json(); })
      .then(d => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch(() => { if (!cancelled) { setError(true); setLoading(false); } });

    return () => { cancelled = true; };
  }, [url]);

  return { data, isLoading, isError };
}

export function usePosts() {
  return useFetch(`${BASE}/posts`);
}

export function usePost(id) {
  return useFetch(id ? `${BASE}/posts/${id}` : null);
}

export function useUser(id) {
  return useFetch(id ? `${BASE}/users/${id}` : null);
}

export function useComments(postId) {
  return useFetch(postId ? `${BASE}/posts/${postId}/comments` : null);
}
