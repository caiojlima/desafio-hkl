import React from 'react';
import { UserContextType, IUser } from '../@types/user';
import { useUsers } from '../api/users/useUsers';

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const { data } = useUsers()
    const [users, setUsers] = React.useState<IUser[]>(data);
    const saveUsers = (users: IUser[]) => {
      setUsers(users)
    }
    return <UserContext.Provider value={{ users, saveUsers }}>{children}</UserContext.Provider>
  }

export default UserProvider;