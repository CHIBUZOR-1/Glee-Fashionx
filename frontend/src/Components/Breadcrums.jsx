import { Breadcrumb } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Breadcrums = ({product}) => {
  const navigate = useNavigate()
  return (
    <Breadcrumb className='px-2 py-2 max-[500px]:text-[11px] max-sm:text-sm'
    items={[
      {
        title: <p className='cursor-pointer' onClick={()=>{navigate("/"); window.scrollTo(0,0)}}>Home</p>,
      },
      {
        title: <p className='cursor-pointer'>{product.category}</p>,
      },
      {
        title: <p>{product.sub_category}</p>,
      },
      {
        title: <p>{product.department}</p>,
      },
    ]}
  />
  )
}

export default Breadcrums