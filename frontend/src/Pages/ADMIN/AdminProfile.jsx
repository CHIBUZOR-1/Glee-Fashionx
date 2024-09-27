import React from 'react'
import { useSelector } from 'react-redux'

const AdminProfile = () => {
  const user = useSelector(state => state.user);
  
  const handleChange = () => {}
  return (
    <div className=' h-[100vh] items-center justify-center flex'>
      <div className='bg- rounded border h-[50vh] w-[450px] p-1 px-2'>
        <h1 className=' font-bold flex text-[24px] justify-center'>Profile</h1>
        <form className='flex flex-col gap-3' >
          <input type="text" value={user.firstname} onChange={handleChange} className='border px-2 text-[16px] font-bold rounded' />
          <input type="text" value={user.lastname} onChange={handleChange} className='border px-1 text-[16px] font-bold rounded' />
          <input type="text" value={user.role} onChange={handleChange} className='border px-1 text-[16px] font-bold rounded' />
          <input type="text" value={user.phoneNumber} onChange={handleChange} className='border px-1 text-[16px] font-bold rounded' />
          <button className='w-full bg-slate-500 text-white rounded-md'>Update</button>
        </form>
        <div className='flex text-red-500 justify-between text-[14px]'>
          <span>Delete Account</span>
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile