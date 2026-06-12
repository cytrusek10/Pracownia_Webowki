import { useQuery } from '@tanstack/react-query';

const BASE = 'https://jsonplaceholder.typicode.com';

const fetcher = (url) => fetch(url).then(r => {
  if (!r.ok) throw new Error('Network error');
  return r.json();
});

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetcher(`${BASE}/posts`),
  });
}

export function usePost(id) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetcher(`${BASE}/posts/${id}`),
    enabled: !!id,
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetcher(`${BASE}/users/${id}`),
    enabled: !!id,
  });
}

export function useComments(postId) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetcher(`${BASE}/posts/${postId}/comments`),
    enabled: !!postId,
  });
}
