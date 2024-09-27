
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Unauthorized from '../Pages/Unauthorized';

const PrivateRoute = () => {
     const user = useSelector((state )=> state.user);
     return user?.role === 'ADMIN'? <Outlet/> : <Unauthorized/>
}

export default PrivateRoute