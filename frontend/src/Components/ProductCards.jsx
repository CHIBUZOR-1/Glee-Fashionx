import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { assets } from './Assets/Assets';
import axios from 'axios';

const ProductCards = () => {
    const [data, setData] = useState([]);
    const [dept, setDept] = useState('Men');
    const [heading, setHeading] = useState("MEN's")
    const scrollElement = useRef();

    useEffect(()=> {
        getBySubCategory()
        // eslint-disable-next-line
    }, [dept])

    const scrollRight = ()=> {
        scrollElement.current.scrollLeft += 400;
    }
    const scrollLeft = ()=> {
        scrollElement.current.scrollLeft -= 400;
    }

    const getBySubCategory = async() => {
        const {data} = await axios.post('/api/products/card_categories', { dept });

         setData(data.data);
    }




  return (
    <div className='flex flex-col w-full max-lg:h-[40vh] px-2 rounded  h-[48vh] max-sm:h-[30vh] mx-auto max-sm:mt-14  mt-8 mb-3 gap-2'>
        <div className='flex max-sm:flex-col max-md:flex-col justify-between w-full px-2'>
          <p  className='text-[19px] max-md:text-[14px] w-full max-sm:text-[12px]'><span className='font-semibold'>{heading}</span> FASHION</p>  
          <div className='w-full'>
            <ul className='flex border p-1 rounded-md border-slate-200 justify-around gap-2 max-sm:text-[9px] max-md:text-[11px] font-medium text-[14px] text-slate-500'>
                <li onClick={()=> {setDept('Men'); setHeading("Men's")}} className='cursor-pointer  px-1 hover:text-white hover:bg-orange-400 rounded-md  max-sm:line-clamp-1 active:text-red-400'>Men</li>
                <li onClick={()=> {setDept('Women'); setHeading("WOMEN's")}} className='cursor-pointer px-1 hover:text-white rounded-md hover:bg-orange-400  active:text-red-400 max-sm:line-clamp-1'>Women</li>
                <li onClick={()=> {setDept('Kids & Baby'); setHeading("KID's & BABY")}} className='cursor-pointer px-1 rounded-md hover:text-white hover:bg-orange-400  max-sm:line-clamp-1 active:text-red-400'>Kids & Baby</li>
            </ul>
          </div>
        </div>
        
        <div className='border rounded items-center my-auto h-full border-slate-400 flex'>
            <div className='h-full max-md:hidden w-[26%] max-md:h-auto max-sm:hidden'>
                {dept === "Men" && <img src={assets.men_category_banner} className='h-full w-full my-auto mx-auto' alt="men12" /> }
                {dept === "Women" && <img src={assets.category_banner} className=' h-full max-lg:h-full max-lg:w-full w-full mx-auto' alt="men12" />}
                {dept === "Kids & Baby" && <img src={assets.kds} className=' h-full max-lg:h-full max-lg:w-full w-full mx-auto' alt="men12" />}
            </div>
            <div className='relative  h-full  max-md:w-full px-1 max-sm:h-full mx-auto max-sm:w-full w-[74%] items-center'>
                <div className=' flex  h-full mb-1 items-center overflow-hidden gap-4 px-2 ' ref={scrollElement}>
                        <button className='left-0 max-sm:opacity-30 hover:opacity-65 flex items-center justify-center w-8 bg-red-400 h-8 absolute rounded-full' onClick={scrollLeft}>
                            <FaAngleLeft />
                        </button>
                        <button className='right-0 max-sm:opacity-30 hover:opacity-65 flex items-center justify-center w-8 bg-red-400 h-8 rounded-full  absolute' onClick={scrollRight}>
                            <FaAngleRight />
                        </button> 
                    
                    {
                       data?.map((p, i)=> {
                            return(
                                <Link key={i} to={`/product/${p._id}`} className='border max-sm:pt-1 hover:border-green-300 flex flex-col justify-center items-center max-[500px]:pt-1 xl:pb-2 h-full' style={{ textDecoration: 'none', color: 'inherit'}} >
                                    <div className='h-[190px] max-xl:w-[200px] max-sm:h-[130px] max-md:h-[180px] max-lg:w-[200px] max-sm:w-[130px] w-[200px]'>
                                        <img className='h-full w-full' src={`/images/${p.images[0].filename}`} alt="" /> 
                                    </div>
                                    <p className='font-semibold max-[480px]:text-[9px] max-md:text-[14px] max-sm:text-[12px]'>{p.brand_name}</p>
                                    <p className='line-clamp-1 max-[480px]:text-[8px] max-md:text-[13px] max-sm:text-[12px] text-ellipsis px-2'><span className='font-semibold'>NEW!</span> {p.product_name}</p>
                                    <div className='flex max-[480px]:text-[8px] max-sm:text-[12px] max-md:text-[13px] justify-center items-center gap-4 font-medium'>
                                        <p>${p.new_price}</p>
                                        <p className='text-red-500 line-through'>${p.old_price}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCards