import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import moment from 'moment'
import { Button, Modal } from 'antd'
import EditUser from '../../Components/EditUser';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [Visible, setVisible] = useState(false)
  const [Visible1, setVisible1] = useState(false)
  const [newRole, setNewRole] = useState("")
  const [user, setUser] = useState(null);
  useEffect(()=> {
    getUsers();
    // eslint-disable-next-line
  }, [])

  const getUsers = async () => {
    const {data} = await axios.get('/api/user/all_users');
    if(data.success) {
      setUsers(data.data)
      toast.success(data.message);
    } else {
      toast.error('Error');
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateRole = await axios.put(`/api/user/update-user/${user._id}`, { newRole });
    if(updateRole.data.success) {
      toast.success(updateRole.data.message)
      setUser(null)
      setNewRole("")
      setVisible(false)
      getUsers()
    } else if(!updateRole.data.success) {
      toast.error(updateRole.data.message)
    } else {
      toast.error("Something Happened")
    }
  }

    const removeUser = async () => {
      const { data } = await axios.delete(`/api/user/delete_user/${user._id}`)
      if(data.success) {
        toast.success(data.message)
        getUsers()
      } else {
        toast.error("Error!")
      }
    }
    

    

  
  return (
    <div className='px-3 gap-1'>
      <div className='flex items-center flex-col'>
        <h1>All Users</h1>
        <hr className='border border-red-400 text-red-300 rounded w-[80px]'/>
      </div>
      <table className='w-full mt-2 border border-orange-100'>
        <thead className="bg-slate-100">
            <tr className='items-center max-sm:text-sm'>
              <th>Sr</th>
              <th>Name</th>
              <th className='max-sm:hidden'>Email</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {users.map((item, index) => {
          return (
             <tr key={index} className='items-center px-1 max-sm:text-sm gap-2 text-center border border-b-green-600 py-1 h-[12px]'>
                <td>{index + 1}</td>
                <td>{item.firstname}</td>
                <td className='max-sm:hidden'>{item.email}</td>
                <td>{item.role}</td>
                <td>{moment(item.createdAt).format('ll')}</td>
                <td className='py-1'><Button className='bg-blue-500 text-white' onClick={() => {setVisible(true); setNewRole(item.role); setUser(item)}}><MdEdit /></Button></td>
                <td className='py-1'><Button  onClick={() => {setVisible1(true); setUser(item)}} className='bg-blue-500 text-white hover:bg-red-500'><MdDelete /></Button></td>
             </tr>
            )
          })}
        </tbody>
      </table>
      <Modal title='Update User Role' onCancel={()=> setVisible(false)} open={Visible} footer={null}>
        <EditUser handleUpdate={handleSubmit} value={newRole} setValue={setNewRole} />
      </Modal>
      <Modal title='Delete User' onCancel={()=> setVisible1(false)} open={Visible1} footer={null}>
        <div className='flex flex-col gap-7 items-center justify-center'>
          <h2 className='font-medium text-2xl'>Are you sure?</h2>
          <div className='flex gap-7'>
            <button onClick={removeUser} className='bg-red-500 cursor-pointer text-[18px] px-2 rounded-md font-semibold text-white'>Yes</button>
            <p onClick={()=> setVisible1(false)} className='bg-sky-500 cursor-pointer text-[18px] px-2 rounded-md font-semibold text-white'>No</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Users