import { FC } from 'react';
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { RootState } from "../../slices";

interface Props {
    children: React.ReactNode;
  }

const RequireAuth: FC<Props> = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.token);

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;