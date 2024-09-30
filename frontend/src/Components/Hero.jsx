import React, { useEffect, useState } from 'react'
import { assets } from './Assets/Assets';


const Hero = () => {
    const [currentImg, setCurrentImg] = useState(0);
    const flex = [
      assets.men22,
      assets.women12,
      assets.kiddies
    ]
  
    const nextFlex = () => {
      if(flex.length - 1 > currentImg) {
        setCurrentImg(prev=> prev + 1)
      }
    }
  
    /*const prevFlex = () => {
      if(currentImg !== 0) {
        setCurrentImg(prev=> prev - 1)
      }
    }*/
  
    useEffect(()=> {
      const interval = setInterval(()=> {
        if(flex.length - 1 > currentImg) {
          nextFlex()
        } else {
          setCurrentImg(0)
        }
      }, 4000)
      return ()=> clearInterval(interval)
      // eslint-disable-next-line
    }, [currentImg])
  return (
    <div>
        <div className='flex w-full max-md:h-[40vh] max-[400px]:h-[27vh] max-sm:h-[35vh] border shadow-md'>
            <div className='w-full flex items-center justify-center'>
              <div>
               <p className='font-semibold max-[400px]:text-[7px] text-[30px] max-md:text-[22px] max-sm:text-[9px]'>Welcome</p>
               <hr className='border w-9 max-sm:w-4 flex justify-center border-green-400'/> 
               <br />
               <p className='max-sm:text-[9px] max-[400px]:text-[7px] max-md:text-[13px]'>Beautify this summer with looks from Glee collection</p>
               <button className='bg-slate-600 max-[400px]:text-[7px] font-semibold text-white w-[90px] max-md:text-[13px] max-sm:w-12 max-sm:rounded-sm max-sm:text-[9px] rounded-md'>Shop now <span></span></button>
              </div>
              
            </div>
            <div className='w-full flex overflow-hidden'>
              {
                flex.map((img, i) => {
                  return(
                    <div key={img + 1} className='w-full min-w-full max-sm:w-full transition-all' style={{transform: `translateX(-${currentImg * 100}%)`}}>
                      <img src={img} alt="men22" className='h-[423px] max-[500px]:h-full max-md:h-full max-sm:h-full w-full object-fit' />
                    </div>
                  )
                })
              }
              
            </div>
          </div>
    </div>
  )
}

export default Hero