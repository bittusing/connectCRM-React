import { Navigate, useLocation } from 'react-router-dom';
import { isTokenValid } from '../../utils/TokenVerify';
// import { LocalStorage } from '../../utils/localStorage';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated } = useSelector((state: RootState) => state.auth);
const  token  = localStorage.getItem("token")
const location = useLocation();
// const validtoken=isTokenValid(token);
console.log({token});

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};