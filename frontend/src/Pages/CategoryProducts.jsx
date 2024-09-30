import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Checkbox, Radio } from 'antd';
import Layout from '../Components/Layout';
import prices from '../helpers/PriceRange';
import brands from '../helpers/Brand';
import axios from 'axios';
import ReactLoading from 'react-loading'
import { Button, Dropdown } from 'antd';
import { RiArrowDropDownLine } from 'react-icons/ri';

const CategoryProducts = () => {
  const params = useParams();
  
  const que = params.category;

  const items = [
    {
      key: '1',
      label: (
        <div>
         <h3 className='font-semibold'>Brands</h3>
            <div className='flex flex-col h-28 overflow-y-scroll scrollbar'>
                {
                    brands.map((b)=> {
                        return (
                            <Checkbox key={b.id} onChange={(e)=> handleFilter(e.target.checked, b.label)}>
                                 {b.label}
                            </Checkbox>
                        )
                    })
                }
            </div>
        </div>               
      ),
    },
    {
        key: 2,
        label: (
            <div className='flex flex-col gap-1'>
                <h3 className='font-semibold'>Sort Prices</h3>
                <div className='sf'>
                    <Radio.Group onChange={(e)=> setRadio(e.target.value)}>
                        {
                            prices.map((t)=> {
                                return (
                                    <div key={t.id}>
                                        <Radio value={t.array}>{t.name}</Radio>
                                    </div>
                                )
                            })
                        }
                    </Radio.Group>
                </div>
            </div>
        ),
    },
    {
        key: 3,
        label: (
            <div className='mb-2'>
                <button className='bg-green-800 text-white w-full rounded-md font-semibold' onClick={()=> {window.location.reload(); window.scrollTo(0,0)}}>RESET FILTERS</button>
            </div>
        ),
    },
  ]

  const [data, setData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    if(!checked.length && !radio.length && que) {
        categoryProducts()
    };
    // eslint-disable-next-line
  }, [checked.length, radio.length, que])

  useEffect(()=> {
    if(checked.length || radio.length) {
        filterProducts()
    };
    // eslint-disable-next-line
  }, [que, checked, radio, checked.length, radio.length])
  

  const categoryProducts = async() => {
    setLoading(true)
    const {data} = await axios.post('/api/products/category_products', {que});
    setData(data.data);
    setLoading(false)
  }



  const handleFilter = async(value, brand)=> {
    let all = [...checked]
    if(value) {
        all.push(brand)
    } else{
        all = all.filter(b => b !== brand)
    }
    setChecked(all);
}

const handleSortBy = (e) => {
    const {value} = e.target

    if(value === "asc") {
        setData(prev => prev.sort((a,b)=> a.new_price - b.new_price))
    }

    if(value === "dsc") {
        setData(prev => prev.sort((a,b)=> b.new_price - a.new_price))
    }
}




const filterProducts = async() => {
    setLoading(true)
  const resp = await axios.post('/api/products/filter_categories', {que, checked, radio});
  if(resp.data.success) {
      setData(resp.data.data);
      setLoading(false)
  }

}


  return (
    <Layout>
        <div className='container mx-auto px-3'>
            <div className='flex gap-3'>
                <div className='flex flex-col w-40 gap-3 max-sm:hidden'>
                    <div>
                        <h3 className='font-semibold'>SORT BY</h3>
                        <form className='sf'>
                            <div className='flex gap-1'>
                                <input type="radio" value={"asc"} name='sort' onChange={handleSortBy} />
                                <label htmlFor="">Price - Low to High</label>
                            </div>
                            <div className='flex gap-1'>
                                <input type="radio" value={"dsc"} name='sort' onChange={handleSortBy} />
                                <label htmlFor="">Price - High to Low </label>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h3 className='font-semibold'>Categories</h3>
                        <div className='flex flex-col h-28 overflow-y-scroll scrollbar'>
                            {
                                brands.map((b)=> {
                                    return (
                                    <Checkbox key={b.id} onChange={(e)=> handleFilter(e.target.checked, b.label)}>
                                      {b.label}
                                    </Checkbox>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='font-semibold'>Sort Prices</h3>
                        <div className='sf'>
                            <Radio.Group onChange={(e)=> setRadio(e.target.value)}>
                                {
                                    prices.map((t)=> {
                                        return (
                                            <div key={t.id}>
                                                <Radio value={t.array}>{t.name}</Radio>
                                            </div>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </div>
                        <div className='mb-2'>
                            <button className='bg-green-800 text-white w-full rounded-md font-semibold' onClick={()=> {window.location.reload(); window.scrollTo(0,0)}}>RESET FILTERS</button>
                        </div>
                    </div>
                </div>
                <div className='flex-1 w-full'>
                  <div className=' flex justify-between gap-4 sm:hidden max-sm:block lg:hidden md:hidden'>
                    <div className='w-full flex justify-between'>
                      <p className=' max-[500px]:text-[12px]'> <span className='font-semibold'>Results</span> : {data?.length === 0? "No Products Found": `(${data?.length} products found)`}</p>
                      <Dropdown menu={{ items }} placement="bottom" arrow>
                        <Button size='small' className='max-[500px]:text-sm'>Filter<RiArrowDropDownLine className=' text-[30px] hover:text-blue-600' /></Button>
                        
                       </Dropdown>
                    </div>
                      
                  </div>
                    <p className='max-sm:hidden'> Results : {data.length === 0? "No Products Found": `(${data.length} products found)`}</p>
                    {
                        loading ? <div className='w-full  flex items-center justify-center h-[70vh]'><ReactLoading type="spin" color='black' height={100} width={50}/></div> : 
                        <div className='grid w-full grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-3 mt-2 mb-2 justify-center items-center gap-4'>
                            {
                                    data?.map((p, i)=> {
                                        return(
                                            
                                                <Link className='flex flex-col border justify-center items-center' key={i} to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit'}} >
                                                    <div className='h-60 max-[400px]:h-20 max-sm:h-30'>
                                                        <img className='h-full w-full' src={`/images/${p.images[0].filename}`} alt={p.images[0].filename} />
                                                    </div>
                                                    <div>
                                                        <p className='max-sm:text-[13px] max-[400px]:text-[11px] font-medium line-clamp-1'>{p.brand_name}</p>
                                                    </div>
                                                    <div>
                                                    <p className='line-clamp-1 px-1 max-sm:text-[12px] max-[400px]:text-[9px] text-ellipsis'>{p.product_name}</p>
                                                    </div>
                                                    <div className='flex max-sm:text-[11px] max-[400px]:text-[9px] font-semibold gap-3'>
                                                        <p>${p.new_price}</p>
                                                        <p className='line-through text-red-500'>${p.old_price}</p>
                                                    </div>
                                                </Link>
                                            
                                        )
                                    })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProducts