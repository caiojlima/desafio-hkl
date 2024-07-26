import { useMutation } from "@tanstack/react-query";
import { IUser } from "../../@types/user";
import { apiClient } from "../api-client";

export function useEditUser() {
    const editUserFn = async (updatedUser: IUser) => {
      const response = await apiClient.put(`/${updatedUser.id}`, updatedUser);
      return response;
    };
  
    return useMutation({
      mutationFn: editUserFn,
      onMutate: async (updatedUser) => {
        return { updatedUser: updatedUser };
      }
    });
  }