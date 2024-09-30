import React, { useState } from 'react'
import Layout from '../Components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../Components/Assets/Assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux';
import {setUser} from '../Store/UserSlice'

import ReactLoading from 'react-loading'

const Loginpage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const handleChange = ({target}) => {
        const {name, value} = target;
        setData((preve) => ({
            ...preve,
            [name]: value
        }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        const response = await axios.post('/api/user/login', data);
        if(response.data.success) {
            toast.success(response.data.message);
            dispatch(setUser(response.data.user));
            setLoading(false)
            navigate('/');
            
            
        }
        if(!response.data.success) {
            toast.warn(response.data.message);
            setLoading(false)
        }
    }

  return (
    <Layout title={"Login Page"}>
        <div className=' flex items-center mb-2 justify-center'>
            <div className='max-[918px]:hidden lg:block border border-solid'>
                <img src={assets.logo} alt="" />
            </div>
            <div className=' border border-solid h-[502px] p-3 w-[400px]'>
                <h2 className=' font-bold flex items-center justify-center text-[24px]'>LOGIN</h2>
                <form className=' px-6 w-full gap-7' onSubmit={handleSubmit}>
                    <div className='ms'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <br />
                        <input className=' border px-3 bg-slate-100 rounded-md w-full h-7' name='email' value={data.email} type='email' required placeholder='input Email'id='email' onChange={handleChange} />
                    </div>
                    <br />
                    <div className='ms'>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <br />
                        <input className=' w-full bg-slate-100 border rounded-md px-3 h-7' name='password' value={data.password}type='password' required placeholder='input Password'id='password' onChange={handleChange} />
                    </div>
                    <br/>
                    <div>
                        <Link to={'/forgot-password'}  onClick={()=> window.scrollTo(0,0)} className=' text-blue-500 active:text-red-400'><p>Forgot Password?</p></Link>
                    </div>
                    <br />
                    <div>
                        <button type='submit' className=' bg-slate-600 active:text-black active:bg-blue-300 text-white w-full h-7 rounded-[8px]'>{loading ? <div className='w-full   flex items-center justify-center h-full'><ReactLoading type="spin" color='white' height={15} width={15}/></div> : "Login"}</button>
                    </div>
                    <br />
                    <div>
                        <p>Don't have an account? <span><Link to='/register'  onClick={()=> window.scrollTo(0,0)} className=' text-blue-500'>Register</Link></span></p>
                    </div>
                </form>
                
            </div>

       </div>
    </Layout>
  )
}

export default Loginpage