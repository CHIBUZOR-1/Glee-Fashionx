import React from 'react'
import Layout from '../../Components/Layout'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AiTwotoneDelete } from 'react-icons/ai';
import { clearCart, removeFromCart } from '../../Store/CartSlice';

const Cartpage = () => {
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Layout title={"Glee Shopping Cart"}>
        <div className='px-7 mx-auto mb-2'>
          {
            cart.items.length === 0 ? <div className='flex flex-col pt-7 gap-4 justify-center items-center'>
              <p className='text-[30px]'>Your cart is empty</p>
              <button onClick={()=> navigate('/')} className='border border-slate-500 h-[70px] font-semibold w-44'>Continue Shopping</button>
            </div> : 
            <>
            <div className="cart-title">
              <div className='min-[850px]:hidden'>
                <div className='flex px-1 justify-between'>
                  <p>Cart</p>
                  <p>Price</p>
                </div>
                {
                  cart.items.map((n, i)=> {
                    return(
                      <div key={i + 1}>
                        <div  className='grid w-full gap-2 grid-cols-3'>
                          <div className='flex flex-col  gap-1'>
                            <img src={`/images/${n.image.filename}`} className='h-[100px] w-28' alt="" />
                            <p className='bg-red-200 p-1 max-[500px]:text-[10px] font-medium text-black rounded-md text-center'>{n.brand}</p>
                          </div>
                          <div className='flex flex-col gap-1'>
                            <p className='max-[500px]:text-[10px] line-clamp-2'>{n.tag}</p>
                            <p className='flex max-[500px]:text-[10px]'><span>Size</span>{n.size}</p>
                            <div className='flex gap-2'>
                              <p className='max-[500px]:text-[10px] rounded-md px-1 bg-slate-100'>QTY: {n.quantity}</p>
                              <button className='bg-slate-300 max-[500px]:text-[10px] rounded-md p-1 text-red-500' onClick={()=>{dispatch(removeFromCart(n)); toast.success('Removed from Cart')}}><AiTwotoneDelete /></button>
                            </div>
                            
                          </div>
                          <div>
                            <p className='text-sm font-semibold float-right'>${n.price}</p>
                          </div>
                        </div>
                        <div className='flex justify-between'>
                          <button className='bg-slate-300 w-25 px-1 text-[14px] mt-2 rounded-md text-red-600' onClick={()=> {dispatch(clearCart({}))}}>Clear cart</button>
                          <p className='max-[500px]:text-[13px]items-center'>Subtotal({n.quantity} item): <span className='font-semibold'>${n.totalPrice}</span></p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <table className='w-full max-[850px]:hidden max-[850px]:text-sm text-center'>
                  <thead>
                    <tr className='tr'>
                      <td className='px-1'>Product</td>
                      <td className='px-1'>Brand</td>
                      <td className='px-1'>Tag</td>
                      <td className='px-1'>Size</td>
                      <td className='px-1'>Price</td>
                      <td className='px-1'>Quantity</td>
                      <td className='px-1'>Total</td>
                      <td className='px-1'>Remove</td>
                    </tr>
                  </thead>
                  <tbody className='gap-3 text-center items-center w-full'>
                    {
                      cart.items.map((p, i)=> {
                          return (
                            <tr key={i} className='border w-full items-center'>
                              <td><img src={`/images/${p.image.filename}`} className='h-[100px] w-28' alt="" /></td>
                              <td>{p.brand}</td>
                              <td><p className='line-clamp-1'>{p.tag}</p></td>
                              <td>{p.size}</td>
                              <td>${p.price}</td>
                              <td>{p.quantity}</td>
                              <td>${p.totalPrice}</td>
                              <td><button className='bg-slate-300 rounded-md p-1 text-red-500' onClick={()=>{dispatch(removeFromCart(p)); toast.success('Removed from Cart')}}><AiTwotoneDelete /></button></td>
                            </tr>
                          )
                      })
                    }
                  </tbody>
                </table>
              <div className='flex max-md:flex-col-reverse justify-between gap-[max(12vw,20px)]'>
                <div className='flex flex-col flex-[1] gap-5'>
                  <h3 className='font-semibold'>Summary</h3>
                  <div>
                    <div className='flex justify-between'>
                      <p>Subtotal</p>
                      <p>${cart?.totalPrice}</p>
                    </div>
                    <hr/>
                    <div className='flex justify-between'>
                      <p>Delivery Fee</p>
                      <p>${!cart?.totalPrice ? 0 : 50}</p>
                    </div>
                    <hr/>
                    <div className='flex justify-between'>
                      <p>Total</p>
                      <p>${cart?.totalPrice + 50}</p>
                    </div>
                    <hr/>
                  </div>
                  <button disabled={!user.email} onClick={()=> navigate("/checkout")} className={`${!user.email? "bg-slate-300" : "bg-slate-600"} cursor-pointer font-semibold py-3 text-white rounded-md w-[max(15vw,200px)]`}>CHECKOUT</button>
                </div>
                <div className='flex-[1]'>
                  <div>
                    <p>Enter Promo code here:</p>
                    <div className='mt-[10] flex justify-between items-center rounded bg-slate-100'>
                      <input className='border-none outline-none pl-[10px] bg-transparent' type="text" placeholder='promo code'/>
                      <button className='w-[max(10vw,150px)] px-[5px] py-3 font-semibold bg-black text-white rounded-[5px] border-none'>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </>
          }

        </div>
    </Layout>
  )
}

export default Cartpage