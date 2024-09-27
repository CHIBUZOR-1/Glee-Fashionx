import React from 'react'

const EditUser = ({ handleUpdate, value, setValue}) => {
  return (
    <div className='flex flex-col'>
        <form className='gap-7' onSubmit={handleUpdate}>
            <div className='flex gap-2'>
              <p className='font-bold'>Role:</p>
                <select value={value} className='border rounded w-[110px] border-slate-300' onChange={(e)=> setValue(e.target.value)} name='newRole'>
                    <option value="ADMIN">ADMIN</option>
                    <option value="GENERAL">GENERAL</option>
                </select>
            </div>
            <button type='submit' className='bg-slate-500 font-bold text-white mt-4 border border-slate-200 rounded items-center flex justify-center w-[110px]'>UPDATE</button>
        </form>
    </div>
  )
}

export default EditUser