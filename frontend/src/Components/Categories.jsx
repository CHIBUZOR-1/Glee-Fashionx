
import React from 'react'
import { Link } from 'react-router-dom';
import Categoryz from '../helpers/Catz';

const Categories = () => {
  return (
    <div className='mt-2 h-[150px] '>
        <div className='flex justify-between px-2'>
            {
                Categoryz.map((cat, i) => {
                    return(
                    <Link to={`/product_category/${cat.label}`} style={{ textDecoration: 'none', color: 'inherit'}} key={cat.id} className='flex mt-1 items-center justify-center flex-col'>
                        <div className='h-full'>
                            <img src={cat.image} alt='' className='h-10'/>
                        </div>
                        <p className='font-semibold'>{cat.label}</p>
                    </Link>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Categories