import React from 'react'

const Items = ({id, name, image, new_price, old_price}) => {
  return (
    <div onClick={()=>window.scrollTo(0,0)} className='h-full px-1 border rounded hover:border-green-300 max-lg:h-full mb-5 flex mt-2 justify-center items-center flex-col  max-sm:m-auto'>
      <div className='h-[200px] max-md:h-[120px] max-sm:w-[90px] max-lg:h-full  max-sm:h-[150px] w-[150px]'>
        <img src={image} className='h-full max-lg:h-full max-md:h-full object-scale-down w-full' alt=''/>
      </div>
      <div className='line-clamp-1 max-sm:text-[11px] justify-center overflow-hidden'>
        <p>{name}</p>
      </div>
      <div className='flex max-sm:text-[10px] font-medium  justify-center gap-7'>
        <p className='nprix'> 
          ${new_price}
        </p>
        <p className={`text-red-400 line-through ${!old_price ? 'hidden' : 'block'}`}>
          ${old_price}
        </p>    
      </div>    
    </div>
  )
}

export default Items