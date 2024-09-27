import React, { useEffect, useState } from 'react'
import { PiUsersThreeFill } from "react-icons/pi";
import { TbPackages } from "react-icons/tb";
import { prodList, getUsers} from '../../helpers/Functions';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const DashboardPanel = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [prods, setProds] = useState([]);


  useEffect(()=> {
    allUsers();
    allProds();

    // eslint-disable-next-line 
  }, [])

  const allUsers = async()=> {
    const list = await getUsers();
      setUsers(list.data);
  }

  const allProds = async()=> {
    const listz = await prodList();
    setProds(listz.data)
  }

  


  return (
    <div className='px-3'>
        <div className='flex max-xl:justify-between max-sm:flex-col gap-6'>
            <div className='flex gap-2 border shadow-md rounded-md p-3 w-full justify-between'>
              <div>
                <p>Total Users</p>
                <p>{users.length}</p>   
              </div>
              <p className='text-5xl p-1 bg-green-600 text-white rounded-full'><PiUsersThreeFill /></p>  
            </div>
            <div className='flex gap-2 border shadow-md rounded-md p-3 w-full justify-between'>
              <div>
                <p>Total Products</p>
                <p>{prods.length}</p>   
              </div>
              <p className='text-5xl p-1 bg-green-600 text-white rounded-full'><TbPackages /></p>  
            </div>
        </div>
        <div className='flex  mb-2 mt-4 max-xl:justify-between max-sm:flex-col gap-6'>
          <div className='flex flex-col gap-2  border shadow-md rounded-md p-3 w-full'>
            <div className=' flex justify-between p-2 text-sm font-semibold'>
              <h1 className='text-center p-2'>Recent Users</h1>
              <button className='bg-red-500 rounded-md px-1 active:accent-teal-500 text-white' onClick={()=> navigate('/dashboard?view=users')}>
                See all
              </button>
            </div> 
            <table className='w-full'>
              <thead>
                <tr>
                  <th>User Image</th>
                  <th>Username</th>
                </tr>
              </thead>
              {
                users.map((u, i)=> {
                  return(
                    <tbody key={u._id}>
                      <tr className='text-center'>
                        <td><Avatar icon={<UserOutlined />}/></td>
                        <td>{u.firstname} {u.lastname}</td>
                      </tr>
                    </tbody>
                  )
                })
              }
            </table>
            
          </div>
          <div className='flex flex-col gap-2 h-[100vh] overflow-y-hidden  border shadow-md rounded-md p-3 w-full'>
            <div className=' flex justify-between p-2 text-sm font-semibold'>
              <h1 className='text-center p-2'>Recent Products</h1>
              <button className='bg-red-500 rounded-md px-1 active:accent-teal-500 text-white' onClick={()=> navigate('/dashboard?view=products')}>
                See all
              </button>
            </div> 
            <table className='w-full h-full'>
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Brands</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody className='h-full'>
                {
                  prods.map((p, i)=> {
                    return(
                      
                        <tr key={p._id} className='text-center'>
                          <td><img src={`/images/${p.images[0].filename}`} className='h-10 w-10' alt="" /></td>
                          <td className=''>{p.brand_name}</td>
                          <td className='max-sm:line-clamp-1'>{p.product_name}</td>
                        </tr>
                      
                    )
                  })
                }
              </tbody>
            </table>
            
          </div>
        </div>
        
    </div>
  )
}

export default DashboardPanel