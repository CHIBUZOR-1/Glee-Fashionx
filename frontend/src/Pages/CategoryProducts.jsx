import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Checkbox, Radio } from 'antd';
import Layout from '../Components/Layout';
import prices from '../helpers/PriceRange';
import brands from '../helpers/Brand';
import axios from 'axios';
import ReactLoading from 'react-loading'
import { Button} from 'antd';
import { RiArrowDropDownLine } from 'react-icons/ri';

const CategoryProducts = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [datas, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [more, setMore] = useState(true)
    const [dataz, setDataz] = useState({
        ct: '',
        sort: 'desc',
        checked: [],
        radio: ''
    });

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('que');
        const sortFromUrl = urlParams.get('sort')
        const checkedFromUrl =  urlParams.get('brand')?.split('--'); // Split brands by --
        const priceFromUrl = urlParams.get('price');
        if(searchFromUrl || sortFromUrl || checkedFromUrl || priceFromUrl) {
            setDataz({
                ...dataz,
                ct: searchFromUrl || '',
                sort: sortFromUrl || 'desc',
                checked: checkedFromUrl || [],
                radio: priceFromUrl
            });
        } 
        const getCatProds = async()=> {
            setLoading(true)
            const searchQuery = urlParams.toString();
            const { data } = await axios.get(`/api/products/category_products?${searchQuery}`);
            if(data.success) {
                setData(data.result)
                setLoading(false);
                if(data?.result.length < 6) {
                    setMore(false)
                }
            }
            if(!data.success) {
                setLoading(false);
                return;
            }
        }
        getCatProds();
    },[location.search]);

    const handleCheckboxChange = (isChecked, brand) => {
        if (isChecked) {
            setDataz({ ...dataz, checked: [...dataz.checked, brand] });
        } else {
            setDataz({ ...dataz, checked: dataz.checked.filter(item => item !== brand) });
        }
    };
    const handleRadioChange = (e) => {
        setDataz({ ...dataz, radio: e.target.value || '' });
    };
    const handleSortChange = (e) => {
        setDataz({ ...dataz, sort: e.target.value || 'desc' });
    };
    const handleShowMore = async() => {
        const nRes = datas.length;
        const startIndex = nRes;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const { data } = await axios.get(`/api/products/category_products?${searchQuery}`);
          if(data.success) {
            setData(prev =>[...prev, ...data.result]);
            if(data?.result.length < 6) {
              setMore(false)
            }
          }
          if(!data.success) {
            return;
          }
    }
    const useFilter = () => {
        const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('que');
        urlParams.set('que', searchFromUrl);
        urlParams.set('sort', dataz.sort);
        dataz.checked.length > 0 && urlParams.set('brand', dataz.checked.join('--')); // Join brands with --
        dataz?.radio?.length > 0 && urlParams.set('price', dataz.radio); // Set price as a range
        const searchQuery = urlParams.toString();
        navigate(`/product_category?${searchQuery}`);
    };

    const resetFilters = () => {
        const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('que');
        setDataz({
            sort: 'desc',
            checked: [],
            radio: ''
        });
        navigate(`/product_category?que=${searchFromUrl}`);
    };

    const handleOpen = () => {
        setOpen(prev => !prev);
    }



  return (
    <Layout title={"Category Products"}>
        <div className='mx-auto px-3'>
            <div className='flex gap-3'>
                <div className='flex flex-col border-r px-2 w-40 gap-3 max-sm:hidden'>
                    <div>
                        <h3 className='font-semibold'>SORT BY</h3>
                        <form className='sf'>
                            <div className='flex gap-1'>
                                <input type="radio" value={"asc"} name='sort' onChange={handleSortChange} />
                                <label htmlFor="">Price - Low to High</label>
                            </div>
                            <div className='flex gap-1'>
                                <input type="radio" value={"dsc"} name='sort' onChange={handleSortChange} />
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
                                    <Checkbox key={b.id} checked={dataz.checked.includes(b.label)} onChange={(e)=> handleCheckboxChange(e.target.checked, b.label)}>
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
                            <Radio.Group onChange={handleRadioChange} value={dataz.radio}>
                                {
                                    prices.map((t)=> {
                                        return (
                                            <div key={t.id}>
                                                <Radio value={`${t.array[0]}-${t.array[1]}`}>{t.name}</Radio>
                                            </div>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </div>
                        <div className='flex flex-col gap-1 py-1 px-1'>
                        <button className='bg-green-800 text-white w-full rounded-md font-semibold' onClick={useFilter}>APPLY FILTERS</button>
                            <button className='bg-green-800 text-white w-full rounded-md font-semibold' onClick={resetFilters}>RESET FILTERS</button>
                        </div>
                    </div>
                </div>
                <div className='flex-1 w-full'>
                  <div className=' flex justify-between gap-4 sm:hidden max-sm:block lg:hidden md:hidden'>
                    <div className='w-full flex justify-between'>
                      <p className=' max-[500px]:text-[12px]'> <span className='font-semibold'>Results</span> : {datas?.length === 0? "No Products Found": `(${datas?.length} products found)`}</p>
                      <div className='flex items-center justify-center'>
                        <Button size='small' onClick={handleOpen} className='max-[500px]:text-sm'>Filter<RiArrowDropDownLine className=' text-[30px] hover:text-blue-600' /></Button>
                        {
                            open && (
                                <div className='flex absolute flex-col gap-1 z-10 right-3 top-[155px] border max-sm:top-[140px] p-1 shadow-md ease-in transition-all duration-500 bg-white rounded-md w-44 '>
                                    <div>
                                        <h3 className='font-semibold'>Categories</h3>
                                        <div className='flex flex-col h-28 overflow-y-scroll scrollbar'>
                                            {
                                                brands.map((b)=> {
                                                    return (
                                                    <Checkbox key={b.id} checked={dataz.checked.includes(b.label)} onChange={(e)=> handleCheckboxChange(e.target.checked, b.label)}>
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
                                            <Radio.Group onChange={handleRadioChange} value={dataz.radio}>
                                                {
                                                    prices.map((t)=> {
                                                        return (
                                                            <div key={t.id}>
                                                                <Radio value={`${t.array[0]}-${t.array[1]}`}>{t.name}</Radio>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Radio.Group>
                                        </div>
                                        <div className='flex flex-col gap-1 py-1 px-1'>
                                        <button className='bg-green-800 text-white w-full rounded-md font-semibold' onClick={useFilter}>APPLY FILTERS</button>
                                            <button className='bg-green-800 text-white w-full rounded-md font-semibold' onClick={resetFilters}>RESET FILTERS</button>
                                        </div>
                                    </div>
                                </div>
                                    
                            )
                                
                        }
                      </div>
                    </div>
                      
                  </div>
                    <p className='max-sm:hidden'> Results : {datas.length === 0? "No Products Found": `(${datas.length} products found)`}</p>
                    {
                        loading ? <div className='w-full  flex items-center justify-center h-[70vh]'><ReactLoading type="spin" color='black' height={100} width={50}/></div> : 
                        <div className='grid w-full grid-cols-3 max-md:grid-cols-3 max-sm:grid-cols-2 mt-2 mb-2 justify-center items-center gap-2'>
                            {
                                    datas?.map((p, i)=> {
                                        return(
                                            
                                                <Link className='flex w-full flex-col border justify-center items-center' key={i} to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit'}} >
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
                    {
                        more && (
                            <div className='w-full flex justify-center items-center p-1'>
                              <button onClick={handleShowMore} className=' text-blue-300 active:bg-slate-500 bg-slate-800 rounded-md p-2'>Load more</button>  
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProducts