import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser, UserSchema } from '../@types/user';
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from '../api/users/useCreateUser';
import { Navigate } from 'react-router-dom';

const UserForm: React.FC = () => {
    const createUser = useCreateUser();
    const [redirect, setRedirect] = React.useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<IUser>({ resolver: zodResolver(UserSchema) })

    const onSubmit: SubmitHandler<IUser> = (data) => {
      createUser.mutate(data);
    }

    const toUsersList = (e: { preventDefault: () => void; }) => {
      e.preventDefault()
      setRedirect(true)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Nome</label>
            <input {...register("name")} />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
            <label htmlFor="document">CPF</label>
            <input {...register("document")} />
            {errors.document && <span>{errors.document.message}</span>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor="phone">Telefone</label>
            <input {...register("phone")} />
            {errors.phone && <span>{errors.phone.message}</span>}
          </div>
          <div>
            <label htmlFor="address">Endereço</label>
            <input {...register("address")} />
            {errors.address && <span>{errors.address.message}</span>}
          </div>
          <input type="submit" />
          <button onClick={toUsersList}>Lista de Usuários</button>
          {redirect && <Navigate to="/list" />}
        </form>
      )
}

export default UserForm;
