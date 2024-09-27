import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Unauthorized from '../Pages/Unauthorized';

const PrivateRoute1 = () => {
     const user = useSelector((state )=> state.user);
     return user?.role === 'GENERAL'? <Outlet/> : <Unauthorized/>
}

export default PrivateRoute1