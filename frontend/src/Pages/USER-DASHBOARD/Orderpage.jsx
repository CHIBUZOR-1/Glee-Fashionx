import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsBoxSeamFill } from "react-icons/bs";

const Orderpage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
        getOrders();
        // eslint-disable-next-line
    }, [])

  const getOrders= async() => {
    setLoading(true)
    const { data } = await axios.get('/api/orders/my_orders');
    setOrders(data.data);
    setLoading(false)

  }

  
  return (
    <div className='mx-0 flex flex-col gap-2 mb-2 px-4'>
      <h2 className='text-[18px]   text-white'><div className='bg-slate-500 p-1 rounded-md inline-block'>My Orders</div></h2>
      <div className='flex flex-col gap-2 mb-2'>
        {
          orders.length === 0? <div className='flex justify-center items-center text-[60px] pt-5 text-slate-200'>No Orders Found</div> :
            orders.map((o, i)=>{
              return(
                <div key={i} className='grid grid-cols-5 rounded-md max-[995px]:grid-cols-none max-md:w-full items-center p-2  gap-2 border border-slate-200'>
                  <div className='text-5xl text-yellow-400 max-md:text-[45px]'><BsBoxSeamFill /></div>
                  <div>
                    <p className='o-p'>{o.products.map((p, i)=> {
                      if(i === o.products.length-1) {
                        return p.tag + " x " + p.quantity
                      } else {
                        return p.tag + " x " + p.quantity + " , "
                      }
                    })}</p>
                  </div>
                  <p>Items : {o.products.length}</p>
                  <p>{o.amount}</p>
                  <div className='flex flex-col justify-center gap-2 items-center'>
                    <p className='border border-slate-200 rounded-md px-1'><span>&#x25cf;</span> <b className='max-[850px]:text-sm'>{o.status}</b></p>
                    <button className='bg-red-500 rounded-md active:bg-orange-400 active:text-slate-500  text-white p-1' onClick={getOrders}>{loading? <div className='animate-pulse'>Please wait</div>:"Track Order"}</button> 
                    
                  </div>
                </div>
              )
            })
        }
    </div>
  </div>
  )
}

export default Orderpage