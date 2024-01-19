import { ReactNode } from "react";
import { useAppSelector } from "../../routes/features/hooks";
import { useCurrentToken } from "../../routes/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(useCurrentToken);
    if (!token) {
        return <Navigate to={'/login'} replace={true}/>
    }
  return children;
};

export default ProtectedRoute;
