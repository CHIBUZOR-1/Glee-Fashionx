import React from 'react'
import Layout from '../Components/Layout';
import { assets } from '../Components/Assets/Assets';

const AboutPage = () => {
  return (
    <Layout title={"Glee About Page"}>
        <div className=' flex max-sm:flex-col gap-3 items-center px-3 justify-center'>
          <div className='border flex justify-center items-center max-sm:h-[300px] max-sm:w-[300px] w-[30%] h-[302px]'>
            <img src={assets.logo} className='h-full' alt="" />
          </div>
          <div className='px-3 flex flex-col justify-center items-center gap-2 flex-1 max-sm:text-[12px]'>
            <div className=' flex justify-center items-center flex-col'>
              <h2 className='font-semibold'>About Us</h2>
              <hr className='border w-16 border-green-600' />
            </div>
            
            <p>Lorem Ipsum is simply a dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text since the 1500s. When an unknown printer took a gallery of type and scrambled it to make a type specimen book.</p>
          </div>
        </div>
    </Layout>
  )
}

export default AboutPage