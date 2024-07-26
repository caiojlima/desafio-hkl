import { z, ZodType } from "zod";

export interface IUser {
    name: string;
    document: string;
    email: string;
    phone: string;
    address: string;
  }
  
  export const UserSchema: ZodType<IUser> = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    document: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF Inválido").min(1),
    email: z.string().email({ message: "Email Inválido" }).min(1),
    phone: z.string().regex(/^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/, "Telefone inválido").min(1),
    address: z.string(),
  });

  export type UserContextType = {
    users: IUser[];
    saveUser: (user: IUser) => void;
  };