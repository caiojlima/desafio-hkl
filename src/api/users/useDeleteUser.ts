import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";

const deleteUserFn = async (id: string) => {
    const response = await apiClient.delete(`${id}`);
    return response;
  };

export function useDeleteUser() {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: deleteUserFn,
    onMutate: async () => {
    await queryClient.cancelQueries({ queryKey: ["users"] });
    },
});
}