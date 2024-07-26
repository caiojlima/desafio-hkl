import * as React from 'react';
import { UserContextType, IUser } from '../@types/user';

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [users, setUsers] = React.useState<IUser[]>([]);

    const saveUser = (user: IUser) => {
        const newUser: IUser = {
          name: user.name,
          document: user.document,
          email: user.email,
          phone: user.phone,
          address: user.address
    
        }
        setUsers([...users, newUser])
      }
    
      return <UserContext.Provider value={{ users, saveUser }}>{children}</UserContext.Provider>
  }

export default UserProvider;