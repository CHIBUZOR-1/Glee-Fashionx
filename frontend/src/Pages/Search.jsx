import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import Loader from '../Components/Loader';

const Search = () => {
  const location = useLocation();
  const query = location.search;
  console.log(query);
  const [results, setResults] = useState();
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    getSearchResults()
    // eslint-disable-next-line
  }, [query]);

  const getSearchResults = async()=> {
    setLoading(true);
    const { data } = await axios.get(`/api/products/search${query}`);
    if(data.success){
      setResults(data.data);
      setLoading(false);
    }
  }
  return (
    <Layout title={"Glee - Search Page"} >
      <div>
      {
            Loading ? 
            <div className='flex items-center justify-center pt-[60px]'>
             <Loader />
            </div> : 
            <div className='flex flex-col items-center justify-center p-2 mx-auto w-auto'>
              <p className='sr'>Search Results : {results?.length === 0? "No Products Found": `${results?.length} products found`}</p>
              <div className='grid grid-cols-4 mt-2 justify-center items-center gap-4'>
                {
                  results?.map((p, i)=>{
                    return(
                      <Link onClick={()=> window.scrollTo(0,0)} className='flex flex-col border justify-center items-center' key={i} to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit'}} >
                          <div className='h-60 max-[500px]:h-20 max-sm:h-22 w-full'>
                            <img className='h-full w-full' src={`/images/${p.images[0].filename}`} alt={p.images[0].filename} />
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