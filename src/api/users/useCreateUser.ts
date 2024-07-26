import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser } from '../../@types/user';
import { apiClient } from '../api-client';

const createUserFn = async (newUser: IUser) => {
  const response = await apiClient.post('', newUser);
  return response.data;
};

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
    }
  });
}