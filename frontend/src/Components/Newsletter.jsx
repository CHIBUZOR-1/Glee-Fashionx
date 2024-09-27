import React, { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className='w-full gap-5 h-[40vh] max-sm:h-[34vh] flex flex-col items-center justify-center m-auto max-sm:px-[70px] px-[140px] mb-[80px] bg-gradient-to-r from-slate-600 to-slate-200'>
        <h1 className='text-white max-[400px]:text-[11px] max-sm:text-[14px] max-md:text-[25px] text-[30px] font-semibold'>Get Exclusive offers on your Email</h1>
        <p className='text-[20px] max-sm:text-[12px] max-[400px]:text-[9px] text-white'>subscribe to our newletter and stay updated</p>
        <div className='flex max-md:h-[50px] items-center max-[400px]:w-[240px] max-md:w-[600px] justify-center bg-white max-sm:w-[350px] max-sm:h-10 w-[730px] h-[70px] rounded-md border'>
            <input className='w-[500px] max-md:w-full  max-sm:w-full ml-7 max-sm:text-[10px] outline-none text-[16px]' value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Your Email here' />
            <button className='w-[210px] max-md:w-[150px] max-md:h-[49px] px-1 max-sm:w-[80px] max-sm:text-[10px] max-sm:h-9  bg-slate-500 text-white rounded-md h-[70px] cursor-pointer text-[16px]'>Subscribe</button>
        </div>
    </div>
  )
}

export default Newsletter