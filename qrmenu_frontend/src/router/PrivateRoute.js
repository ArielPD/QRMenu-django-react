import { Navigate /*, Redirect*/} from 'react-router-dom';
import  { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

function PrivateRoute({ children }) {
    const auth = useContext(AuthContext);

    return ( 
        auth.token ? children : <Navigate to='/login' />
    )
}

export default PrivateRoute;
