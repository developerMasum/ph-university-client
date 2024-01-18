import { Button } from 'antd';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLoginMutation } from '../routes/features/auth/authApi';

interface LoginFormValues {
  id: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
        id:'A-0002',
        password: 'admin123'
    }
  });

  const [login,{data,error}] = useLoginMutation()
  console.log('data',data,error);

  const onSubmit: SubmitHandler<LoginFormValues> = (userInfo) => {
    // Replace the following log with your actual authentication logic
    console.log('Login data:', data);
    login(userInfo)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" {...register('id', { required: 'ID is required' })} />
        <p>{errors.id?.message}</p>
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" {...register('password', { required: 'Password is required' })} />
        <p>{errors.password?.message}</p>
      </div>

      <Button  htmlType='submit'>Login </Button>
    </form>
  );
};

export default Login;
