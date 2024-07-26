import * as React from 'react';
import { IUser, UserSchema } from '../@types/user';
import { useUsers } from '../api/users/useUsers';
import { useDeleteUser } from '../api/users/useDeleteUser';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Popover, Typography, Grid, TextField, Box, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEditUser } from '../api/users/useEditUser';

const UserList: React.FC = () => {
    const users = useUsers();
    const navigate = useNavigate()
    

    const deleteUser = useDeleteUser();
    const deleteUserButton = (id: string) => {
        deleteUser.mutate(id);
        navigate(0)
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const updateUser = useEditUser();

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<IUser>({ resolver: zodResolver(UserSchema) })

    const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
        const { id } = users.data.find((user: IUser) => user.email === data.email)
        data.id = id;
        updateUser.mutate(data);
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
                <TableCell align="justify">
                    <IconButton aria-label="edit" size="small" onClick={handleClick}>
                        <Edit fontSize="small" />
                    </IconButton>
                </TableCell>
                <Popover
                    id={user.id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                >
                    <Box
                        component="form"
                        display="flex" 
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        marginTop={0}
                        onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h6" gutterBottom>
                        Editar usuário
                    </Typography>
                    <Grid container spacing={3} width={450} marginBottom={2}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            {...register("name")}
                            defaultValue={user.name}
                            label="Nome"
                            fullWidth
                            autoComplete="given-name"
                            error={ errors.name ? true : false }
                            helperText={errors.name && errors.name?.message }
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            {...register("email")}
                            defaultValue={user.email}
                            label="Email"
                            fullWidth
                            autoComplete="email"
                            error={ errors.email ? true : false }
                            helperText={errors.email && errors.email?.message }
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            {...register("address")}
                            defaultValue={user.address}
                            label="Endereço (opcional)"
                            fullWidth
                            autoComplete="shipping address-line1"
                            error={ errors.address ? true : false }
                            helperText={errors.address && errors.address?.message }
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            {...register("phone")}
                            defaultValue={user.phone}
                            label="Telefone"
                            fullWidth
                            autoComplete="phone"
                            error={ errors.phone ? true : false }
                            helperText={errors.phone && errors.phone?.message }
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField required {...register("document")} defaultValue={user.document} label="CPF" fullWidth error={ errors.document ? true : false }
                            helperText={errors.document && errors.document?.message } />
                        </Grid>
                    </Grid>
                    <Box marginBottom={2}>
                        <Button variant="contained" type='submit'>Editar</Button>
                    </Box>
                    </Box>
                </Popover>
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
