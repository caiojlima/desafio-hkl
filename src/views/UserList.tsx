import * as React from 'react';
import { IUser } from '../@types/user';
import { useUsers } from '../api/users/useUsers';
import { useDeleteUser } from '../api/users/useDeleteUser';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UserList: React.FC = () => {
    const users = useUsers();
    const navigate = useNavigate()
    console.log(" ddale");
    

    const deleteUser = useDeleteUser();
    const deleteUserButton = (id: string) => {
        deleteUser.mutate(id);
        navigate(0)
    }

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="justify">CPF</TableCell>
              <TableCell align="justify">Email</TableCell>
              <TableCell align="justify">Telefone</TableCell>
              <TableCell align="justify">Endereço</TableCell>
              <TableCell align="justify">Editar</TableCell>
              <TableCell align="justify">Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.isSuccess && users.data?.map((user: IUser) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="justify">{user.document}</TableCell>
                <TableCell align="justify">{user.email}</TableCell>
                <TableCell align="justify">{user.phone}</TableCell>
                <TableCell align="justify">{user.address}</TableCell>
                <TableCell align="justify"><button></button></TableCell>
                <TableCell align="justify">
                    <IconButton aria-label="delete" size="small" onClick={() => deleteUserButton(user.id!)}>
                        <Delete fontSize="small" />
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default UserList;
