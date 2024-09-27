import React from 'react'
import { useSelector } from 'react-redux';


const Profile = () => {
  const user = useSelector(state => state.user);
  const handleChange = () => {}


  return (
    <div className=' h-[100vh] max-sm:px-2 items-center justify-center flex'>
      <div className='bg- rounded border h-[50vh] w-[450px] p-1 px-2'>
        <h1 className=' font-bold flex text-[24px] justify-center'>Profile</h1>
        <form className='flex flex-col gap-3' >
          <input type="text" value={user.firstname} onChange={handleChange} className='border max-[500px]:text-[14px] px-2 text-[16px] font-bold rounded' />
          <input type="text" value={user.lastname} onChange={handleChange} className='border max-[500px]:text-[14px] px-1 text-[16px] font-bold rounded' />
          <input type="text" value={user.email} onChange={handleChange} className='border max-[500px]:text-[14px] px-1 text-[16px] font-bold rounded' />
          <input type="text" value={user.phoneNumber} onChange={handleChange} className='border max-[500px]:text-[14px] px-1 text-[16px] font-bold rounded' />
          <button className='w-full max-[500px]:text-[16px] bg-slate-500 text-white rounded-md'>Update</button>
        </form>
        <div className='flex max-[500px]:text-[12px] text-red-500 justify-between text-[14px]'>
          <span>Delete Account</span>
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  )
}

export default Profile