import * as React from 'react';
import { IUser } from '../@types/user';
import { useUsers } from '../api/users/useUsers';
import { useDeleteUser } from '../api/users/useDeleteUser';

const UserList: React.FC = () => {
    const users = useUsers();
    const deleteUser = useDeleteUser();

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                    <th>Editar</th>
                    <th>Deletar</th>
                </tr>
                </thead>
                <tbody>
                {users.data?.map((user: IUser) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.document}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                        <td>
                            <button onClick={() => {deleteUser.mutate(user.id!)}}></button>
                        </td>
                        <td>
                            <button onClick={() => {deleteUser.mutate(user.id!)}}></button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
      )
}

export default UserList;
