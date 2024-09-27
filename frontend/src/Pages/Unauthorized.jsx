import React from 'react'
import { GoAlert } from "react-icons/go";
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className='flex min-h[65vh] flex-col items-center justify-center pt-9'>
        <div className='bg-orange-300 text-white p-4 items-center rounded-full text-[120px]'><GoAlert /></div>
        <h1 className=' font-semibold text-[90px]'>401</h1>
        <h2 className='text-red-700 font-bold text-[30px]'>Unauthorized Access:</h2>
        <p>You do not have permission to view this page using the credentials you supplied.</p>
        <Link to="/" className=' m-3 p-3 border hover:bg-red-400 hover:text-white rounded border-solid active:bg-black active:text-white'>Back</Link>

    </div>
  )
}

export default Unauthorized