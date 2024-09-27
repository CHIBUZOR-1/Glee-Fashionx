import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchNewArrivals = async () => {
        try {
          const response = await axios.get('/api/products/new-arrivals');
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching new arrivals', error);
        }
      };
  
      fetchNewArrivals();
    }, []);
  return (
    <div  className='flex flex-col mt-9 w-auto mb-2 max-sm:mt-10 justify-center items-center'>
      <h2>New Arrivals</h2>
      <hr className=' border w-10 rounded-md border-green-400' />
      <div className="grid gap-4 grid-cols-4 px-2 mt-3 w-auto">
        {products.map(p => (
          <Link to={`/product/${p._id}`} key={p._id} onClick={()=> window.scrollTo(0,0)} className="flex border rounded-sm items-center justify-center flex-col">
            <div className='h-[300px] max-xl:w-full max-sm:h-auto max-md:h-[200px] max-lg:w-full max-sm:w-full w-[300px]'>
               <img className='h-full w-full' src={`/images/${p.images[0].filename}`} alt="" /> 
            </div>
            <p className='font-semibold max-[480px]:text-[7px] max-sm:text-[12px]'>{p.brand_name}</p>
            <p className='line-clamp-1 max-[480px]:text-[8px] max-sm:text-[12px] text-ellipsis px-2'><span className='font-semibold'>NEW!</span> {p.product_name}</p>
            <div className='flex max-[480px]:text-[7px] max-sm:text-[12px] justify-center items-center gap-4 font-medium'>
                <p>${p.new_price}</p>
                <p className='text-red-500 line-through'>${p.old_price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NewArrivals