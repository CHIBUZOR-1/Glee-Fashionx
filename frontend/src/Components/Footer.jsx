import React from 'react'
import { AiOutlineFacebook } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import Newsletter from './Newsletter';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className=' bg-stone-800 px-2 pt-2 w-full gap-[6px]'>
      <Newsletter/>
        <div className=' pt-[30px] max-sm:pt-3 gap-6 text-white '>
          <div className=' pt-[30px] gap-5 justify-between  flex px-3 text-white '>
            <div className='gap-4'>
              <h2 className='text-[20px] max-sm:text-[13px]'>Learn More</h2>
              <ul className='max-sm:text-[12px]'>
                <li className='cursor-pointer' onClick={()=> {navigate('/About'); window.scrollTo(0,0)}}>About Us</li>
                <li>Exchange Policy</li>
                <li>FAQs</li>
                <li>Privacy Policy</li>
              </ul>
              
            </div>
            <div>
              <h2 className='text-[20px] max-sm:text-[13px]'>Our Community</h2>
              <ul className='max-sm:text-[12px]'>
                <li>Terms and Condition</li>
                <li>Special Offers</li>
              </ul>
            </div>
              
            <div>
              <h2 className='max-sm:text-[13px] text-[20px]'>GET IN TOUCH</h2>
                <ul className='max-sm:text-[12px]'>
                  <li>(+234) 0709090090</li>
                  <li>contact@shoplake.com</li>
                </ul>
              </div>
          </div>
          <div className='flex gap-3 px-5 mt-3'>
            <AiOutlineFacebook className='bg-blue-500 rounded'/>
            <BsTwitterX className='bg-blue-500 rounded'/>
            <FaLinkedin className='bg-blue-500 rounded'/>
          </div>
            <div className=' pt-8'>
                <hr className='text-white border border-solid w-full flex-row'/>
                <p className='max-sm:text-[12px] flex justify-center text-white pt-2'>Copyright 2024  &copy;  Shoplake.com - All Right Reserved</p>
            </div>
      </div>
    </div>
  )
}

export default Footer