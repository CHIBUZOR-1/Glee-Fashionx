import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import { Link, Outlet, useLocation } from 'react-router-dom'
import AdminProfile from './AdminProfile';
import Productpage from './Productpage';
import Users from './Users';
import Orderz from './Orderz';
import { RiDashboardFill } from "react-icons/ri";
import DashboardPanel from './DashboardPanel';

const Dashboard = () => {
  const location = useLocation();
  const [view, setView] = useState('');
  
  useEffect(()=> {
    const params = new URLSearchParams(location.search);
    const viewUrl = params.get('view');
    if(viewUrl) {
      setView(viewUrl);
    }
  }, [location.search]);

  return (
    <Layout title={"Admin Dashboard - Glee"}>
      <div className='flex max-sm:gap-4  min-h-screen mt-0 top-0'>
          <div className={`bg-white ${location.pathname !== '/dashboard/admin' && 'hidden sm:block'} max-w-[180px] max-sm:max-w-full max-sm:px-2 border border-t-0`}>
            <aside className='flex flex-col h-full p-2 max-sm:w-full gap-4'>
                <Link to={'/dashboard?view=admin-panel'}  className='cursor-pointer  px-3 h-[40px] text-[20px] border'>
                    <p  className='hover:text-red-500 flex justify-between'><span className=' rounded items-center text-slate-700 mt-1 p-1 text-[19px]'><RiDashboardFill /></span> Dashboard</p>
                </Link>
                <Link to={'/dashboard?view=admin-profile'}  className='cursor-pointer  px-3 h-[40px] text-[20px] border'>
                    <p  className='hover:text-red-500 flex justify-between'>Profile <span className='bg-black text-white rounded items-center mt-1 p-1 text-[12px]'>Admin</span></p>
                </Link>
                <Link to={'/dashboard?view=products'}  className='cursor-pointer  px-3 h-[40px] text-[20px] border'>
                    <p className='hover:text-red-500 '>All Products</p>
                </Link>
                <Link to={'/dashboard?view=users'}  className='cursor-pointer  px-3 h-[40px] text-[20px] border '>
                    <p className='hover:text-red-500 '>All Users</p>
                </Link>
                <Link  to={'/dashboard?view=Orders'}  className='cursor-pointer  px-3 h-[40px] text-[20px] border '>
                    <p className='hover:text-red-500 '>Orders</p>
                </Link>
            </aside>
          </div>
          <main className={`w-full overflow-hidden p-1 ${location.pathname === '/dashboard/admin' ?  'hidden' : 'block'}`}>
            {view === 'admin-panel'? <DashboardPanel /> : <Outlet/>}
            {view === 'admin-profile'? <AdminProfile /> : <Outlet/>}
            {view === 'products'? <Productpage /> : <Outlet/>}
            {view === 'users'? <Users /> : <Outlet/>}
            {view === 'Orders'? <Orderz /> : <Outlet/>}
          </main> 
      </div>
    </Layout>
  )
}

export default Dashboard