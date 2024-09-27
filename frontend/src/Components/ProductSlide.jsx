import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Store/CartSlice';
import { Rate } from 'antd';
import { useNavigate } from 'react-router-dom';


const ProductSlide = ({product, firstImg}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState("");
  const [size, setSize] = useState('');



  const imageSelect = (url) => {
    setActiveImg(url)
  }

  return (
    <div className=' mx-auto mb-2 flex flex-col px-3 gap-4'>
      <div className='w-full max-sm:gap-4 max-md:gap-3 max-md:flex-col mx-auto mb-2 flex px-2 gap-1'>
        <div className='min-h-[200px] max-sm:items-center max-md:w-full max-sm:justify-center max-sm:h-full w-[900px] max-md:flex-col-reverse flex gap-2'>
            <div className='h-20 flex flex-col rounded max-md:w-full max-md:flex-row w-[80px] max-sm:flex-row max-sm:w-full gap-3'>
                {
                  product?.images?.map((img, i)=> {
                    return(
                      <div className='h-full' key={i + 1}>
                        <img className='border h-full w-full max-sm:h-full rounded-md' src={`/images/${img.filename}`} alt="name" onMouseEnter={()=> imageSelect(`/images/${img.filename}`)} />
                      </div>
                    )
                  })
                }
            </div>
            <div className=' h-[400px] w-[400px] max-sm:left-0 border-slate-200  max-sm:h-[300px]  rounded-md max-sm:w-auto border'>
              <img className='h-full items-center bg-black rounded-md w-full mix-blend-multiply' src={activeImg ? activeImg : firstImg } alt=""/>
            </div>
            
        </div>
        <div className='flex w-full flex-col max-md:gap-2 gap-5'>
            <p className='font-semibold'>{product.brand_name}</p>
            <h1 className='text-[24px] w-full mx-auto max-md:text-[18px] max-sm:text-[14px]'>{product.product_name}</h1>
            <div className='flex gap-2 max-sm:flex-col  text-yellow-400'>
                <div className='items-center '>
                  <Rate className='max-sm:text-[12px]' disabled allowHalf value={product.totalRating}/>
                </div>
                <div className='items-center'>
                  <p onClick={()=> {navigate(`/product_reviews/${product._id}`); window.scrollTo(0,0)}} className='text-[16px] max-sm:text-[12px] text-slate-600 hover:text-red-300'>({product.numReviews} <span>Ratings</span>) </p>
                </div>
            </div>
            <div className='flex max-sm:text-[16px] max-md:text-[18px] gap-7 text-[24px]'>
                <div className=''>${product.old_price?.toLocaleString()}</div>
                <div className='line-through text-red-500'>${product.new_price?.toLocaleString()}</div>
            </div>
            <div className='flex gap-2'>
              <p className='max-sm:text-[13px]'>SIZES</p>
              {
                (product.category === ("Men" || "Women") && product.department !== "Shoes") && 
                <select className='border max-sm:text-[12px] max-sm:w-full rounded' name="size" onChange={(e)=> setSize(e.target.value)} value={size} required>
                <option className={`${size? "hidden" : "block"}`} value="">-select size-</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
              }
              {
                (product.category === "Kids & Baby" && product.department !== "Shoes") && 
                <select className='border max-sm:text-[12px] max-sm:w-full rounded' name="size" onChange={(e)=> setSize(e.target.value)} value={size} required>
                <option className={`${size? "hidden" : "block"}`} value="">-select size-</option>
                <option value="0-6 Months">0-6 Months</option>
                <option value="6-12 Months">6-12 Months</option>
                <option value="1-2 Years">1-2 Years</option>
                <option value="2-3 Years">2-3 Years</option>
                <option value="4-6 Years">4-6 Years</option>
                <option value="6-10 Years">6-10 Years</option>
              </select>
              }
              {
                (product.category === ("Men" || "Women") && product.department === "Shoes") && 
                <select className='border max-sm:text-[12px] max-sm:w-full rounded' name="size" onChange={(e)=> setSize(e.target.value)} value={size} required>
                <option className={`${size? "hidden" : "block"}`} value="">-select size-</option>
                <option value="EU 39">EU 39</option>
                <option value="EU 40">EU 40</option>
                <option value="EU 41">EU 41</option>
                <option value="EU 42">EU 42</option>
                <option value="EU 43">EU 43</option>
                <option value="EU 344">EU 44</option>
                <option value="EU 45">EU 45</option>
              </select>
              }
              
            </div>
            <div>
              <button disabled={!size} className={`w-[200px] mx-auto max-sm:w-full rounded max-sm:text-[9px] cursor-pointer p-3 font-semibold text-[16px] ${!size? 'bg-red-200' :"bg-red-500"}  text-white`} onClick={()=> {dispatch(addToCart({id: product._id, tag: product.product_name, brand: product.brand_name, size: size, totalPrice: product.new_price, price: product.new_price, image: product.images })); toast.success('Added to cart')} }>ADD TO CART</button>
            </div>
            <div className='mx-auto max-sm:hidden' >
              <p className='font-semibold'>Product Details:</p>
              <p className='text-[16px]  w-auto'>{product.description}</p>
            </div>
        </div>
      </div>
      
          <div className='mx-auto w-full max-sm:block lg:hidden md:hidden sm:hidden' >
            <p className='font-semibold max-sm:text-[19px]'>Product Details:</p>
            <p className='text-[16px] max-sm:text-[14px] w-auto'>{product.description}</p>
          </div>
  </div>
  )
}

export default ProductSlide