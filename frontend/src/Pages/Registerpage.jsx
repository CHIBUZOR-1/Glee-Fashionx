import React, { useState } from 'react'
import Layout from '../Components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading'

const Registerpage = () => {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = ({target}) => {
        const {name, value} = target;
        setData((preve) => ({
            ...preve,
            [name]: value
        }));
    }
    const handleSubmit = async(e)=> {
        e.preventDefault();
        setLoading(true)
        if(data.confirmPassword === data.password) {
            const res = await axios.post('/api/user/register', data);
            if(res.data.success) {
                toast.success(res.data.message);
                setLoading(false)
                navigate('/new-user'); 
            } else {
                toast.error("Registration failed");
            }
        }
    }

  return (
    <Layout title={"Glee Registration Page"}>
        <div className=' flex items-center justify-center'>
            <div className=' border h-[502px] px-3 w-[450px] justify-center rounded-[8px] mb-2'>
                    <h1 className=' font-bold flex text-[24px] justify-center'>Register</h1>
                    <form className='' onSubmit={handleSubmit}>
                        <div className=' flex max-[460px]:gap-1 gap-3 justify-center'>
                            <div>
                                <label htmlFor='firstname'>
                                    <strong>First Name</strong>
                                </label>
                                <br />
                                <input className=' h-7 w-full bg-slate-100 px-2 border rounded-md' name='firstname' value={data.firstname} type='text' placeholder='input firstname' id='firstname' onChange={handleChange} required/>
                            </div>
                            <br />
                            <div>
                                <label htmlFor='lastname'>
                                    <strong>Last Name</strong>
                                </label>
                                <br />
                                <input className=' border bg-slate-100 w-full h-7 px-2 rounded-md' name='lastname' value={data.lastname} type='text' placeholder='input Lastname' id='lastname' onChange={handleChange} required/>
                            </div>
                        </div>
                        <br />
                        <div>
                            <label htmlFor='PhoneNumber'>
                                <strong>Phone</strong>
                            </label>
                            <br />
                            <input className=' border w-full h-7 bg-slate-100  px-2 rounded-md' name='phoneNumber' value={data.phoneNumber} type='text' placeholder='input Phone number'id='phoneNumber' onChange={handleChange} required/>
                        </div>
                        <br />
                        <div>
                            <label htmlFor='email'>
                                <strong>Email</strong>
                            </label>
                            <br />
                            <input className=' border bg-slate-100 w-full h-7 px-2 rounded-md' name='email' value={data.email} type='email' placeholder='input Email' id='email' onChange={handleChange} required/>
                        </div>
                        <br />
                        <div className=' flex gap-3 justify-center items-center'>
                            <div>
                                <label htmlFor='password'>
                                    <strong>Password</strong>
                                </label>
                                <br />
                                <input className=' border w-full bg-slate-100 h-7 px-2 rounded-md' name='password' value={data.password} type='password' placeholder='Input Password' id='password' onChange={handleChange} required/>
                                <div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor='Confirm password'>
                                    <strong>Confirm password</strong>
                                </label>
                                <br />
                                <input className=' border h-7 w-full bg-slate-100 px-2 rounded-md' name='confirmPassword' value={data.confirmPassword} type='password' placeholder='Confirm password' id='Confirm password' onChange={handleChange} required/>
                            </div> 
                        </div>
                        <br />
                        <div>
                            <button type='submit' className=' w-full active:bg-orange-300 active:text-black max-[460px]:text-sm bg-slate-600 text-white h-8 rounded-md'>{loading ? <div className='w-full   flex items-center justify-center h-full'><ReactLoading type="spin" color='white' height={15} width={15}/></div> : "Register"}</button>
                        </div>
                        <br />
                        <div>
                            <p>Already Have an account? <span><Link to='/login'  onClick={()=> window.scrollTo(0,0)} className=' text-blue-500'>Login</Link></span></p>
                        </div>
                    </form>
                    
                </div>
        </div>
    </Layout>
  )
}

export default Registerpage