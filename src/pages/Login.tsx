import { Button } from "antd";
import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useLoginMutation } from "../routes/features/auth/authApi";
import { useAppDispatch } from "../routes/features/hooks";
import { TUser, setUser } from "../routes/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [login] = useLoginMutation();
  // console.log("data", data, error);

  const onSubmit: SubmitHandler<LoginFormValues> = async (
    userInfo: FieldValues
  ) => {
    try {
      // Replace the following log with your actual authentication logic
      // console.log("Login data:", data);
      toast.loading("Logging in...");

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Successfully logged in");
      navigate(`/${user.role}/dashboard`);
      console.log("user", user);
    } catch (error) {
      // Handle errors here
      console.error("An error occurred during login:", error);
      toast.error("Login failed. Please try again.");
      // Additional error handling if needed
    } finally {
      // You can perform cleanup or finalization here, if needed
      toast.dismiss();
    }
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
