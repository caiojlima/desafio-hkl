import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUser } from '../@types/user';

const UserForm: React.FC = () => {
    const {
        register,
        handleSubmit,
      } = useForm<IUser>()

    const onSubmit: SubmitHandler<IUser> = (data) => console.log(data)

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input {...register("name")} />
          <input {...register("document")} />
          <input {...register("email")} />
          <input {...register("phone")} />
          <input {...register("address")} />
          <input type="submit" />
        </form>
      )
}

export default UserForm;