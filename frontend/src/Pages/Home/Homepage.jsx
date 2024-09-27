import React from 'react'
import Layout from '../../Components/Layout'
import ProductCards from '../../Components/ProductCards';
import Hero from '../../Components/Hero';
import NewArrivals from '../../Components/NewArrivals';

const Homepage = () => {


  return (
    <Layout title={"Home page"}>
      <Hero />
      <ProductCards />
      <br />
      <NewArrivals/>
    </Layout>
  )
}

export default Homepage