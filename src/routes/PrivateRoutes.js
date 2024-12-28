import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const role = useSelector((state) => state.user.account.role);

    if (!isAuthenticated) {
        return <Navigate to="/login"></Navigate>;
    }
    if (isAuthenticated && role === 'Admin') {
        return <>{props.children}</>;
    }
};

export default PrivateRoute;
