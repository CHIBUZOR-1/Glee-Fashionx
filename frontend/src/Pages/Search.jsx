import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Loader from '../Components/Loader';


const Search = () => {
  const location = useLocation();
  //const navigate = useNavigate();
  const [results, setResults] = useState();
  const [dataz, setDataz] = useState({
    kw: '',
    sort: 'desc',
    checked: [],
    radio: ''
  });
  const [Loading, setLoading] = useState(false);
  const [more, setMore] = useState(true);

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
     const searchFromUrl = urlParams.get('src');
     const sortFromUrl = urlParams.get('sort')
     const checkedFromUrl =  urlParams.get('brand')?.split('--'); // Split brands by --
     const priceFromUrl = urlParams.get('price');
     if(searchFromUrl || sortFromUrl || checkedFromUrl || priceFromUrl) {
         setDataz({
             ...dataz,
             kw: searchFromUrl || '',
             sort: sortFromUrl || 'desc',
             checked: checkedFromUrl || [],
             radio: priceFromUrl
         });
     } 
     const getAllProducts = async()=> {
         setLoading(true)
         const searchQuery = urlParams.toString();
         const { data } = await axios.get(`/api/products/all_products?${searchQuery}`);
         if(data.success) {
             setResults(data.products)
             setLoading(false);
             if(data?.products.length < 9) {
                 setMore(false)
             }
         }
         if(!data.success) {
           setLoading(false);
           return;
         }
       }
       getAllProducts();
 },[location.search]);

  
  return (
    <Layout title={"Glee - Search Page"} >
      <div>
      {
            Loading ? 
            <div className='flex items-center justify-center h-[60vh]'>
             <Loader />
            </div> : 
            <div className='flex flex-col items-center justify-center p-2 mx-auto w-auto'>
              <p className='sr'>Search Results : {results?.length === 0? "No Products Found": `${results?.length} products found`}</p>
              <div className='grid grid-cols-4 max-sm:grid-cols-2 max-md:grid-cols-3 mt-2 justify-center items-center gap-2'>
                {
                  results?.map((p, i)=>{
                    return(
                      <Link onClick={()=> window.scrollTo(0,0)} className='flex flex-col border justify-center items-center' key={i} to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit'}} >
                          <div className='h-60 max-[500px]:h-20 max-sm:h-22 w-full'>
                            <img className='h-full w-full max-sm:object-contain' src={`/images/${p.images[0].filename}`} alt={p.images[0].filename} />
                          </div>
                          <div>
                            <p className='line-clamp-1 max-[400px]:text-[11px] max-sm:text-[13px] font-semibold p-1'>{p.brand_name}</p>
                          </div>                    
                          <div>
                            <p className='line-clamp-1 max-[400px]:text-[9px] max-sm:text-[12px] text-ellipsis p-1'>{p.product_name}</p>
                          </div>
                          <div className='flex max-[400px]:text-[9px] max-sm:text-[11px] font-semibold gap-3'>
                            <p>${p.new_price}</p>
                            <p className='line-through text-red-500'>${p.old_price}</p>
                          </div>
                      </Link>
                    )
                  })
                }
              </div>
            </div>
            
      }
            
      </div>
    </Layout>
  )
}

export default Search