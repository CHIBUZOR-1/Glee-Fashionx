import React, { useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';

const Productuploads = ({products, visibility}) => {
    const [data, setData] = useState({
        product_name: "",
        brand_name: "",
        description: "",
        old_price: "",
        new_price: "",
        images: [], 
        category: "",
        sub_category: "",
        department: "",
        isNewArrival: "",
        stock: ""
      });

      const deleteImg = (index) => {
        const newImg = [...data.images];
        newImg.splice(index, 1);
        setData((preve)=> {
          return{
            ...preve,
            images: [...newImg]
          }
        })

        
    }

      const handleChange = ({target}) => {
        const {name, value} = target;
        setData((preve) => ({
            ...preve,
            [name]: value
        }));
      }
      const handleImage = (e) => {
        const file = e.target.files[0];
         setData ((prev)=> {
          return{
            ...prev,
            images: [...prev.images, file]
         }
         })
         
      }

      const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', data.product_name);
        formData.append('brand_name', data.brand_name);
        formData.append('description', data.description);
        formData.append('old_price', data.old_price);
        formData.append('new_price', data.new_price);
        Array.from(data.images).forEach(file => {
          formData.append('images', file);
        });
        formData.append('category', data.category);
        formData.append('sub_category', data.sub_category);
        formData.append('stock', data.stock);
        formData.append('isNewArrival', data.isNewArrival);
        formData.append('department', data.department);
        
        const formFill = await axios.post('/api/products/add_product', formData);
        if(formFill.data.success) {
            toast.success(formFill.data.message)
            setData({
              product_name: "",
              brand_name: "",
              description: "",
              old_price: "",
              new_price: "",
              images: [], 
              category: "",
              sub_category: "",
              stock: "",
              isNewArrival: "",
              department: ""
            })
            
        } else {
            toast.error(formFill.data.message)
        }
      }

  return (
    <div className='mt-5 h-[40vw] w-full overflow-y-scroll'>
        <form className='flex flex-col gap-3 ' encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className='flex justify-between gap-2'>
              <input type="text" className='border w-full px-3 py-2 text-[15px]' name='product_name' onChange={handleChange} value={data.product_name} placeholder='Enter Product name' required/>
              <div className='w-full'>
                  <select name='brand_name' onChange={handleChange} value={data.brand_name} className='border w-full gap-2 active:outline-green-200 text-[15px] px-3 py-2' >
                        <option value="">--Select Brand--</option>
                        <option value="Calvin klein">Calvin klein</option>
                        <option value="Tommy Hilfiger">Tommy Hilfiger</option>
                        <option value="Levi's">Levi's</option>
                        <option value="Naturalizer">Naturalizer</option>
                        <option value="ARIAT">ARIAT</option>
                        <option value="Nike">Nike</option>
                        <option value="Rains">Rains</option>
                        <option value="Coach">Coach</option>
                        <option value="Silver jeans co.">Silver jeans co.</option>
                        <option value="Addidas">Addidas</option>
                        <option value="Hanes">Hanes</option>
                        <option value="Steve Madden">Steve Madden</option>
                        <option value="SEIKO">SEIKO</option>
                        <option value="True Religion">True Religion</option>
                        <option value="Casio">Casio</option>
                        <option value="Karl Lagerfeld Paris">Karl Lagerfeld Paris</option>
                        <option value="Invicta">Invicta</option>
                        <option value="Anrabess">Anrabess</option>
                        <option value="Bulova">Bulova</option>
                        <option value="PUMA">PUMA</option>
                        <option value="NYDJ">NYDJ</option>
                        <option value="Zhenwei">Zhenwei</option>
                        <option value="New Balance">New Balance</option>
                        <option value="Kenneth Cole Reaction">Kenneth Cole Reaction</option>
                        <option value="COLE HAAN">Cole Haan</option>
                        <option value="Hugo Boss">Hugo Boss</option>
                        <option value="Carter's">Carter's</option>
                        <option value="TruMiracle">TruMiracle</option>
                        <option value="Epic Threads">Epic Threads</option>
                        <option value="Barbour">Barbour</option>
                        <option value="EFFY Collection">EFFY Collection</option>
                        <option value="Little Me">Little Me</option>
                        <option value="Brooks Brothers">Brooks Brothers</option>
                        <option value="Le Vian">Le Vian</option>
                        <option value="Ted Baker">Ted Baker</option>
                        <option value="LE VIAN">LE VIAN</option>
                        <option value="Original Penguine">Original Penguine</option>
                        <option value="PGA Tour">PGA Tour</option>
                        <option value="Timberland">Timberland</option>
                        <option value="Triton">Triton</option>
                        <option value="Frye">Frye</option>
                        <option value="DEMOCRACY">DEMOCRACY</option>
                        <option value="Lazer">Lazer</option>
                  </select> 
              </div>
            </div>
            <div className='flex gap-2 justify-between'>
               <input className='border px-3 py-2 text-[15px] w-full' value={data.new_price} name='new_price' onChange={handleChange} placeholder='Enter new price' type="number" required/> 
               <input className='border px-3 py-2 text-[15px] w-full' value={data.old_price} name='old_price' onChange={handleChange} type="number" placeholder='Enter old price'/>
               <input type="number" className='border px-3 py-2 text-[15px] w-full' value={data.stock}  name='stock' placeholder='Enter quantity' onChange={handleChange} required/>
            </div>
            <div className='flex justify-between gap-2'>
                <div>
                    <p>Category</p>
                    <select name='category' onChange={handleChange} value={data.category} className='border w-full gap-2 active:outline-green-300 text-[15px] px-2 py-2' >
                        <option value="">--Categories--</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids & Baby">Kids & Baby</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Jewelry">Jewelry</option>
                    </select>
                </div>
                <div>
                    <p>Sub-category</p>
                    <select name='sub_category' onChange={handleChange} value={data.sub_category} className='border w-full gap-2 active:outline-green-300 text-[15px] px-2 py-2' >
                        <option value="">--Subcategories--</option>
                        <option value="Men's Accessories">Men's Accessories</option>
                        <option value="Women's Accessories">Women's Accessories</option>
                        <option value="Men's Clothing">Men's Clothing</option>
                        <option value="Women's Clothing">Women's Clothing</option>
                        <option value="Women's Shoes">Women's Shoes</option>
                        <option value="Men's Shoes">Men's Shoes</option>
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                        <option value="Baby">Baby</option>
                    </select>
                </div>
                <div>
                <p>Select Department</p>
                  <select name='department' onChange={handleChange} value={data.department} className='border w-full gap-2 active:outline-green-200 text-[15px] px-2 py-2' >
                        <option value="">--Departments--</option>
                        <option value="Jeans & Pants">Jeans & Pants</option>
                        <option value="Shirts & Tops">Shirts & Tops</option>
                        <option value="Coats & Suits">Coats & Suits</option>
                        <option value="Belts">Belts</option>
                        <option value="Watches">Watches</option>
                        <option value="Baby wears">Baby wears</option>
                        <option value="Bags">Bags</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Underwears">Underwears</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Wallets">Wallets</option>
                        <option value="Ties & Pocket Sqaures">Ties & Pocket Sqaures</option>
                  </select> 
                </div>
            </div>
            <div >
                <p>Description</p>
                <textarea value={data.description} onChange={handleChange} name="description" className='w-full px-2 border focus:outline-gray-200'  rows={3} cols={5} required></textarea>
            </div>
            <div>
              <p>New Arrival</p>
              <select name="isNewArrival" className='border rounded' value={data.isNewArrival} onChange={handleChange}>
                <option className={`${data.isNewArrival? 'hidden' : 'block'}`} value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
                    <label htmlFor="image">Upload Image</label>
                    <label htmlFor="imageInput">
                       <div className='p-2 bg-slate-100 border rounded h-32 w-full flex flex-col justify-center items-center'>
                            <span className='text-3xl'><IoCloudUploadOutline /></span>
                            <p>Upload product image</p>
                            <input name='images' multiple type="file" id='imageInput' onChange={handleImage} hidden required/>
                      </div> 
                    </label>
                    
                    <div className='flex border-none gap-2'>
                        {
                                data.images.map((el, i)=> {
                                    return(
                                        <div className='relative border-none' key={i}>
                                          <img src={URL.createObjectURL(el)} alt="" className='bg-slate-100 border-none h-full mt-2 w-[64px]'/> 
                                          <div className='absolute bottom-0 right-0'>
                                            <button className='bg-red-500 rounded-full p-1 text-white' onClick={()=> {deleteImg(i)}}><MdDelete /></button>
                                          </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
             </div>
            
            <button type='submit' className='bg-red-500 mt-2 rounded-md h-8 text-[16px] py-1 text-white mb-2'>Upload</button>
        </form>
    </div>
  )
}

export default Productuploads