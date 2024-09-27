import React, { useEffect, useState } from 'react'
import Profile from './Profile'
import Orderpage from './Orderpage'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Layout from '../../Components/Layout'

const UserDashboard = () => {
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
    <Layout title={"Customer Dashboard - Glee"}>
      <div className='flex max-sm:gap-4 max-sm:flex-col min-h-[100vh] mt-0 top-0'>
          <div className='bg-white w-full max-w-[180px] max-sm:max-w-full max-sm:px-2 border border-t-0 h-full'>
            <aside className='flex flex-col pl-4 pt-9 max-sm:w-full gap-4'>
                <Link to={'/Customer?view=my-profile'} style={{ textDecoration: 'none ', color: 'inherit'}} className='cursor-pointer  px-3 h-[40px] text-[20px] border'>
                    <p  className='hover:text-red-500 flex justify-between'>Profile <span className='bg-black text-white rounded items-center mt-1 p-1 text-[12px]'>USER</span></p>
                </Link>
                <Link  to={'/Customer?view=Orders'} style={{ textDecoration: 'none ', color: 'inherit'}} className='cursor-pointer bg-gradient-to-r from-slate-600 to-slate-200 px-3 h-[40px] text-[20px] border '>
                    <p className='hover:text-red-500 text-white'>Orders</p>
                </Link>

            </aside>
          
          </div>
          <main className='w-full'>
            {view === 'my-profile'? <Profile /> : <Outlet/>}
            {view === 'Orders'? <Orderpage /> : <Outlet/>}
          </main> 
        </div>
      </Layout>
  )
}

export default UserDashboard