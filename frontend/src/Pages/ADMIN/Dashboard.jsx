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
      <div className='flex max-sm:gap-4 max-sm:flex-col min-h-[100vh] mt-0 top-0'>
          <div className='bg-white w-full max-w-[180px] max-sm:max-w-full max-sm:px-2 border border-t-0 h-full'>
            <aside className='flex flex-col pl-4 pt-9 max-sm:w-full gap-4'>
                <Link to={'/dashboard?view=admin-panel'} style={{ textDecoration: 'none ', color: 'inherit'}} className='cursor-pointer  px-3 h-[40px] text-[20px] border'>
                    <p  className='hover:text-red-500 flex justify-between'><span className=' rounded items-center text-slate-700 mt-1 p-1 text-[19px]'><RiDashboardFill /></span> Dashboard</p>
                </Link>
                <Link to={'/dashboard?view=admin-profile'} style={{ textDecoration: 'none ', color: 'inherit'}} className='cursor-pointer  px-3 h-[40px] text-[20px] border'>
                    <p  className='hover:text-red-500 flex justify-between'>Profile <span className='bg-black text-white rounded items-center mt-1 p-1 text-[12px]'>Admin</span></p>
                </Link>
                <Link to={'/dashboard?view=products'} style={{ textDecoration: 'none ', color: 'inherit'}} className='cursor-pointer bg-gradient-to-r from-slate-600 to-slate-200 px-3 h-[40px] text-[20px] border'>
                    <p className='hover:text-red-500 text-white'>All Products</p>
                </Link>
                <Link to={'/dashboard?view=users'} style={{ textDecoration: 'none ', color: 'inherit'}} className='cursor-pointer bg-gradient-to-r from-slate-600 to-slate-200 px-3 h-[40px] text-[20px] border '>
                    <p className='hover:text-red-500 text-white'>All Users</p>
                </Link>
                <Link  to={'/dashboard?view=Orders'} style={{ textDecoration: 'none ', color: 'inherit'}} className='cursor-pointer bg-gradient-to-r from-slate-600 to-slate-200 px-3 h-[40px] text-[20px] border '>
                    <p className='hover:text-red-500 text-white'>Orders</p>
                </Link>

            </aside>
          
          </div>
          <main className='w-full'>
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