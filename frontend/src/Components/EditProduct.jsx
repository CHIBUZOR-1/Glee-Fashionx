import React from 'react'

const EditProduct = ({handleSubmit, value1, value2, value3, value4, value5, value6, setValue1, setValue2, setValue3, setValue4, setValue5, setValue6}) => {
  return (
    <div className='mt-7'>
        <form className='gap-4 flex flex-col' onSubmit={handleSubmit}>
            <input type="text" className='border px-3 py-2 text-[15px]' name='newName' onChange={(e)=> setValue1(e.target.value)} value={value1} placeholder='Enter Product name' required/>
            <div className='flex flex-col gap-2 justify-between'>
               <input className='border px-2 py-1 text-[15px] w-full' value={value2} name='newPrice' onChange={(e)=> setValue2(e.target.value)} placeholder='Enter new price' type="number" required/> 
               <input className='border px-3 py-2 text-[15px] w-full' value={value3} name='oldPrice' onChange={(e)=> setValue3(e.target.value)} type="number" placeholder='Enter old price' required/>
               <input type="number" className='border px-3 py-2 text-[15px] w-full' value={value4}  name='newStock' placeholder='Enter quantity' onChange={(e)=> setValue4(e.target.value)} required/>
               <input type="text" className='border px-2 py-1 text-[15px] w-full' onChange={(e)=> setValue5(e.target.value)} value={value5} name='newCategory' placeholder='Enter category name' />
               <input type="text" className='border px-2 py-1 text-[15px] w-full' onChange={(e)=> setValue6(e.target.value)} value={value6} name='newSubCategory' placeholder='Enter sub_category name' />
            </div>
            <div className='flex justify-center items-center'>
              <button type='submit' className='bg-red-600 h-7 p-1 text-white w-[100px] font-bold rounded'>UPDATE</button>  
            </div>
            
        </form>
    </div>
  )
}

export default EditProduct