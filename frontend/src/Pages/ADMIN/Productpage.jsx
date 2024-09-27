import React, {  useState } from 'react'
import axios from 'axios';
import { Modal } from 'antd'
import Productuploads from '../../Components/Productuploads'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import EditProduct from '../../Components/EditProduct';
import Loader from '../../Components/Loader';
import { prodList } from '../../helpers/Functions';

const Productpagez = () => {
  const [allProductz, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [Visible1, setVisible1] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [oldPrice, setOldPrice] = useState(false);
  const [newStock, setNewStock] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [newSubCategory, setNewSubCategory] = useState("")
  const [product, setProduct] = useState(null)

  useEffect(()=> {
    getAllProducts()
  }, [])
  
  const getAllProducts = async() => {
    setLoading(true)
    const list = await prodList();
    if(list.success) {
      setLoading(false)
      setAllProducts(list.data);
      toast.success(list.message)
    } else {
      toast.error('Error');
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateProduct = await axios.put(`/api/products/update_product/${product._id}`, { newName, oldPrice, newPrice, newStock, newCategory, newSubCategory});
    if(updateProduct.data.success) {
      toast.success(updateProduct.data.message)
      setProduct(null)
      setVisible1(false)
      getAllProducts()
    } else {
      toast.error(updateProduct.data.message)
    }
  }

  const deleteProduct = async(id) =>{
    const {data} = await axios.delete(`/api/products/delete_product/${id}`)
    if(data.success) {
      toast.success(data.message)
      getAllProducts()
    } else {
      toast.error('Error Occurred!')
    }
  }

  return (
    <div className=' flex flex-col border-b-green-100 shadow-sm'>
        <div className='flex justify-between h-6 px-4 py-3 items-center'>
            <p className=' rounded-md bg-slate-400 px-3 text-white text-[18px] font-semibold'>All products</p>
            <button onClick={()=>  setVisible(true)} className='font-semibold bg-slate-500 px-3 rounded-md text-[18px] text-white' >Add Product</button>
        </div>
        <div className='h-[100vh] mt-3 overflow-y-scroll scrollbar'>
          {
            loading ? 
            <div className='flex items-center justify-center pt-[60px]'>
             <Loader />
            </div> : 
            <div className='mt-2 max-[920px]:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 max-sm:gap-6 max-[500px]:grid-cols-2  grid grid-cols-6 gap-5 items-center rounded pl-3  sm:flex-auto'>
              {
                allProductz.map((p, i)=> {
                  return(
                    <div key={i + 1} className=' bg-white rounded border-gray-200 border p-[2px] w-[120px] flex justify-center flex-col items-center'>
                      <img src={`/images/${p.images[0].filename}`} alt=""  className='h-[100px] w-full'/>
                      <h1 className='font-bold  text-ellipsis line-clamp-1 capitalize text-[12px]'>{p.brand_name.toUpperCase()}</h1>
                      <h1 className='text-ellipsis max-sm:text-[10px] line-clamp-1'>{p.product_name}</h1>
                      <div className='flex justify-between h-8 items-center gap-2 w-full'>
                        <div onClick={()=> {setVisible1(true); setOldPrice(p.old_price); setNewName(p.product_name); setNewSubCategory(p.sub_category); setNewPrice(p.new_price); setNewStock(p.stock); setNewCategory(p.category); setProduct(p)}} className='bg-red-500 flex justify-center items-center cursor-pointer active:bg-blue-600 text-white rounded-full p-[6px] text-[15px] text-center'><FaRegEdit /></div>
                        <div className='bg-red-500 cursor-pointer flex justify-center items-center active:bg-blue-600 text-white rounded-full p-[6px] text-[15px] text-center' onClick={()=>deleteProduct(p._id)}><MdDelete /></div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          }
        </div>
        <Modal onCancel={()=> setVisible(false)}  open={Visible}  footer={null}>
            <Productuploads />
        </Modal>
        <Modal onCancel={()=> setVisible1(false)} open={Visible1} footer={null}>
            <EditProduct handleSubmit={handleUpdate} setValue1={setNewName} value1={newName} setValue2={setNewPrice} setValue6={setNewSubCategory} value6={newSubCategory} value2={newPrice} setValue3={setOldPrice} value3={oldPrice} setValue4={setNewStock} value4={newStock} setValue5={setNewCategory} value5={newCategory}/>
        </Modal>
    </div>
  )
}

export default Productpagez