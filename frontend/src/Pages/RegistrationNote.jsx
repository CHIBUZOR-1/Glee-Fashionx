import React from 'react'
import Layout from '../Components/Layout'

const RegistrationNote = () => {
  return (
        <div className='flex  flex-col pt-5 h-full gap-2 justify-center items-center px-1'>
            <h2 className='text-[29px] max-sm:text-[20px] font-semibold'>Registration Successful!</h2>
            <p className='text-[16px] max-sm:text-[10px]'>A verification link will be sent to you registered email to complete your registration.</p>
        </div>
  )
}

export default RegistrationNote