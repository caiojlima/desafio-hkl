import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';

const getUsersFn = async () => {
  const response = await apiClient.get('');
  return response.data;
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsersFn,
  });
}