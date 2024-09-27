import React from 'react'
import Navbar from './Navbar/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Helmet from 'react-helmet'

const Layout = ({children, title, description}) => {
  return (
    <div>
      <Helmet>
        <meta charset="UTF-8"/>
        <meta name="author" content="AMAECHI HENRY CHIBUZOR"/>
        <meta name="description" content={description}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="index, follow"></meta>
        <title>{title}</title>
      </Helmet>
      <ToastContainer className={`max-sm:flex max-sm:justify-center max-sm:text-sm`} />
      <Navbar/>
      <main className='pt-[80px] min-h-[90vh] max-[850px]:pt-[110px]'>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout