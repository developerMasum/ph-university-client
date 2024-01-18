import { Button } from "antd";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../routes/features/auth/authApi";
import { useAppDispatch } from "../routes/features/hooks";
import { setUser } from "../routes/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

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
      id: "A-0002",
      password: "admin123",
    },
  });

  const dispatch = useAppDispatch()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [login, { error }] = useLoginMutation();
  // console.log("data", data, error);

  const onSubmit: SubmitHandler<LoginFormValues> = async (userInfo) => {
    // Replace the following log with your actual authentication logic
    // console.log("Login data:", data);

    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken)
    dispatch(setUser({user: user,token:res.data.accessToken}))
    console.log('user',user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          {...register("id", { required: "ID is required" })}
        />
        <p>{errors.id?.message}</p>
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        <p>{errors.password?.message}</p>
      </div>

      <Button htmlType="submit">Login </Button>
    </form>
  );
};

export default Login;
