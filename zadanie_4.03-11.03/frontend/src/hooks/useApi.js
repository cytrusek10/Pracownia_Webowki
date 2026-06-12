import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE = 'http://localhost:3001';

const fetcher = (url, options) =>
  fetch(url, options).then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
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

export function useAddComment(postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      fetcher(`${BASE}/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate & refetch comments after adding
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
}
