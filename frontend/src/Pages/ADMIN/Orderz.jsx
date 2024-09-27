import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsBoxSeamFill } from "react-icons/bs";
import { toast } from 'react-toastify';

const Orderz = () => {
  const [orders, setOrders] = useState([]);

  useEffect(()=> {
    getAllOrders();
  }, []);

  const getAllOrders = async() => {
    const res = await axios.get('/api/orders/all_orders');
    if(res.data.success) {
      setOrders(res.data.data);
    } else {
      toast.error("Error Occurred!")
    }
  }

  const statusHandler = async(e, orderId) => {
    const res = await axios.post('/api/orders/status', {orderId, status: e.target.value});
    if(res.data.success) {
      await getAllOrders();
    }
  }

  return (
    <div className='mx-0 flex-col flex gap-2 px-4'>
    <h2 className='text-[18px]  text-white'><div className='bg-slate-500 px-2 rounded-sm inline-block'>Orders</div></h2>
    <div className='flex flex-col gap-2 mb-2 '>
    {
      orders.length === 0? <div className='flex text-center items-center text-[60px] pt-5 text-slate-200'>No Orders Found</div> :
        orders.map((o, i)=>{
          return(
            <div key={i} className='grid xl:grid-cols-5 max-md:w-full items-center p-2  gap-2 border rounded border-slate-200'>
              <div className='text-5xl text-yellow-400 max-md:text-[45px]'><BsBoxSeamFill /></div>
              <div>
                <p className='o-p'>{o.products.map((p, i)=> {
                  if(i === o.products.length-1) {
                    return p.tag + " x " + p.quantity
                  } else {
                    return p.tag + " x " + p.quantity + " , "
                  }
                })}</p>
                <p className='max-md:text-sm'>{o.address.firstname + " " + o.address.lastname}</p> 
                <div className='max-md:text-sm'>
                  <p>{o.address.state+ ","}</p>
                  <p>{o.address.city+", "+ o.address.state+", "+ o.address.country+", "+ o.address.zipcode}</p>
                </div>
                <p className='max-md:text-sm'>{o.address.phone}</p>
              </div>
              <p>Items : {o.products.length}</p>
              <p>${o.amount}</p>
              <div className='flex flex-col gap-2 justify-center items-center'>
                {o.payment.success? <p className='bg-green-600 text-white font-medium px-1 rounded'>Payment Successful</p> : <p className='bg-red-100 text-red-500 font-medium px-1 rounded'>Payment Failed</p>}
                <select className='border rounded max-md:text-sm border-slate-300' onChange={(e)=> statusHandler(e, o._id)} value={o.status}>
                  <option value="Order Processing">Order Processing</option>
                  <option value="Order Failed">Order Failed</option>
                  <option value="Out for Shipping">Out for Shipping</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
                 
              
            </div>
          )
        })
      }
    </div>
  </div>
  )
}

export default Orderz