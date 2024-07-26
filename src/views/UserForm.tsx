import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser, UserSchema } from '../@types/user';
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from '../api/users/useCreateUser';
import { Navigate } from 'react-router-dom';
import { Typography, Grid, TextField, Box, Button, Alert, Grow } from '@mui/material';

const UserForm: React.FC = () => {
    const createUser = useCreateUser();
    const [redirect, setRedirect] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm<IUser>({ resolver: zodResolver(UserSchema) })

    const onSubmit: SubmitHandler<IUser> = (data) => {
      createUser.mutate(data);
      reset();
      setSuccess(true)
    }

    const toUsersList = (e: { preventDefault: () => void; }) => {
      e.preventDefault()
      setRedirect(true)
    }

    return (
      <Box
        component="form"
        display="flex" 
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        marginTop={25}
        onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Registro de usuário
      </Typography>
      <Grid container spacing={3} width={450} marginBottom={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            {...register("name")}
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
            label="Telefone"
            fullWidth
            autoComplete="phone"
            error={ errors.phone ? true : false }
            helperText={errors.phone && errors.phone?.message }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required {...register("document")} label="CPF" fullWidth error={ errors.document ? true : false }
            helperText={errors.document && errors.document?.message } />
        </Grid>
      </Grid>
      <Box marginBottom={2}>
        <Button variant="contained" type='submit'>Enviar</Button>
      </Box>
      <Button variant="contained" color='secondary' onClick={toUsersList}>Ver Lista</Button>
      {success && <Box marginTop={3}>
        <Grow in={success} timeout={1000}>{<Alert severity="success">Usuário salvo com sucesso!</Alert>}</Grow>
      </Box>}
      { redirect && <Navigate to="/list" /> }
    </Box>
      )
}

export default UserForm;
