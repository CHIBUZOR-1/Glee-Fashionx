import React, { useState } from 'react'
import Layout from '../Components/Layout'
import axios from 'axios';
import { assets } from '../Components/Assets/Assets';
import { toast } from 'react-toastify';

const Forgotpassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {data} = await axios.post('/api/user/forgot-password', {email});
        if(data.success) {
            toast.success(data.message)
            setEmail("")
        } else {
            toast.error('Email not valid!')
        }

    }

  return (
    <Layout title={"Glee - Forgot Password Page"}>
        <div className=' flex max-[480px]:px-2 flex-col justify-center gap-3 mt-5 items-center'>
            <div className='flex justify-center max-lg:w-36 items-center rounded border h-16 w-24'>
               <img src={assets.logo1} className='h-full' alt="" /> 
            </div>
            
            <div className=' w-[450px] max-[480px]:w-full h-[200px] max-[480px]:h-full border max-[480px]:px-1 rounded px-4 py-2'>
                <h2 className=' text-[24px] max-[480px]:text-[15px] flex font-semibold justify-center'>FORGOT PASSWORD?</h2>
                <p className='max-[480px]:text-[11px]'>Enter the email address associated with your Glee account.</p>
                <form className=' w-full' onSubmit={handleSubmit}>
                    <div className='ms'>
                        <label htmlFor='newPassword'>
                            <strong className='max-[480px]:text-[12px]'>Email</strong>
                        </label>
                        <br />
                        <input className=' border rounded-md h-7 w-full px-2 bg-slate-100' name='Email' value={email} type='text' placeholder='input email here' id='email' onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <button disabled={!email} className={`${!email? "bg-slate-300":"bg-slate-600"} w-full cursor-pointer  text-white rounded-md h-8`} type='submit'>Continue</button>
                    </div>
                </form>
                
            </div>

       </div>
    </Layout>
  )
}

export default Forgotpassword