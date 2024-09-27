import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import Breadcrums from '../../Components/Breadcrums'
import ProductSlide from '../../Components/ProductSlide'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RelatedProducts from '../../Components/RelatedProducts';

const Productpage = () => {
  const [pData, setPdata] = useState({});
  const [img, setImg] = useState("");

  const { id } = useParams();
  console.log(pData.sub_category);

  useEffect(()=> {
    getDetails();
    // eslint-disable-next-line
  }, [id]);

  const getDetails = async() => {
    const {data} = await axios.post('/api/products/product_details', { id });
      setPdata(data.data);
      setImg(data.data.images[0])
  }

  return (
    <Layout title={`${pData.product_name} - Glee`} description={"Product Details"}>
        <Breadcrums product={pData}/>
        <ProductSlide product={pData} firstImg={`/images/${img.filename}`}/>
        <RelatedProducts id={id} cats={pData.sub_category}/>
    </Layout>
  )
}

export default Productpage