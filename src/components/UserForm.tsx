import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser, UserSchema } from '../@types/user';
import { zodResolver } from "@hookform/resolvers/zod";

const UserForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<IUser>({ resolver: zodResolver(UserSchema) })

    const onSubmit: SubmitHandler<IUser> = (data) => console.log(data)

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
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
        </form>
      )
}

export default UserForm;
