import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout';
import DropIn from 'braintree-web-drop-in-react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { clearCart } from '../Store/CartSlice';

const Checkout = () => {
    const userToken = useSelector(state=> state.user);
    const dispatch = useDispatch();
    const cart = useSelector(state=> state.cart);
    const navigate = useNavigate();
    const [instance, setInstance] = useState("");
    const [clientToken, setClientToken] = useState("");
    let carts = cart.items;
    const [datas, setDatas] = useState({
        firstname: userToken.firstname,
        lastname: userToken.lastname,
        email: userToken.email,
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: userToken.phoneNumber
    });

    useEffect(()=> {
        getToken()
        // eslint-disable-next-line
    }, [userToken?.email]);

    const handleChange = ({target}) => {
        const {name, value} = target;
        setDatas((preve)=> ({
            ...preve,
            [name]: value
        }));
    }
    

    const getToken = async() => {
        try {
            const {data} = await axios.get('/api/orders/braintree/token');
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error);
        }
    }
    console.log(carts);
    const handlePayment = async(event) => {
        try {
            event.preventDefault();
            const { nonce } = await instance.requestPaymentMethod();
            
            let orderData = {
                nonce,
                carts,
                address: datas,
                amount: cart.totalPrice + 50
            }
            const {data} = await axios.post('/api/orders/braintree/payment', orderData);
            toast.success('Payment Successfull');
            navigate('/Customer?view=Orders')
            dispatch(clearCart());
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout title={'Glee Order-Page'}>
    <div className=' container mb-3'>
        <form className='flex flex-col' onSubmit={handlePayment}>
            <div className='flex max-md:flex-col gap-3'>
                <div className='w-full gap-3 flex flex-col px-1'>
                    <p className='text-[30px] font-semibold'>Delivery Information</p>
                    <div className='flex gap-2'>
                        <input name='firstname' className='w-full font-semibold text-slate-500 border px-1 outline-green-400' value={datas.firstname} onChange={handleChange} required type="text" placeholder='First Name' />
                        <input name='lastname' className='w-full font-semibold text-slate-500 border px-1 outline-green-400' value={datas.lastname} onChange={handleChange} required type="text" placeholder='Last Name' />
                    </div>
                    <input name='email' className='w-full font-semibold text-slate-500 border px-1 outline-green-400' value={datas.email} onChange={handleChange} required type="email" placeholder='Email Address' />
                    <input name='street' className='w-full font-semibold text-slate-500 border px-1 outline-green-400' value={datas.street} onChange={handleChange} required type="text" placeholder='Street' />
                    <div className='flex gap-2'>
                        <input name='city' className='w-full font-semibold text-slate-500 border px-1 outline-green-400' value={datas.city} onChange={handleChange} required type="text" placeholder='City' />
                        <input name='state' className='w-full font-semibold text-slate-500 border px-1 outline-green-400' value={datas.state} onChange={handleChange} required type="text" placeholder='State' />
                    </div>
                    <div className='flex gap-2'>
                        <input name='zipcode' className='w-full font-semibold text-slate-500 border px-1 outline-green-400' value={datas.zipcode} onChange={handleChange} required type="text" placeholder='Zip Code' />
                        <input name='country' className='w-full font-semibold text-slate-500 border px-1 outline-green-400' value={datas.country} onChange={handleChange} required type="text" placeholder='Country' />
                    </div>
                    <input name='phone' className='w-full font-semibold text-slate-500 border px-1 outline-green-400' value={datas.phone} onChange={handleChange} required type="text" placeholder='Phone'/>
                </div>
                <div className='w-full'>
                    <div className='gap-3 flex w-full flex-col px-1'>
                        <p className='text-[30px] font-semibold'>Summary</p>
                        <div>
                        <div className='summaries'>
                            <p className='font-medium'>Subtotal</p>
                            <p>${cart.totalPrice}</p>
                        </div>
                        <hr/>
                        <div className='summaries'>
                            <p className='font-medium'>Delivery Fee</p>
                            <p>${50}</p>
                        </div>
                        <hr/>
                        <div className='summaries'>
                            <p className='font-medium'>Total</p>
                            <p>${cart.totalPrice + 50}</p>
                        </div>
                        <hr/>
                        </div>
                        
                    </div>  
                </div>
            </div>
            <div className='px-2 mx-auto items-center flex gap-2 justify-center'>
              {
                                !clientToken ? ('') : (
                                    <div className='flex flex-col justify-center items-center'>
                                     <DropIn options={{authorization: clientToken}} onInstance={(instance) => setInstance(instance)}/>
                                     <button className='bg-red-600 active:bg-blue-500 hover:bg-green-400 text-white rounded px-2 h-10' type='submit'>MAKE PAYMENT</button> 
                                    </div>
                                )
             }  
            </div>
            
        </form>
    </div>
    
</Layout>
  )
}

export default Checkout