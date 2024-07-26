export interface IUser {
    name: string;
    document: string;
    email: string;
    phone: number;
    address: string;
  }
  export type UserContextType = {
    users: IUser[];
    saveUser: (user: IUser) => void;
  };