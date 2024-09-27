import React from 'react'
import ReactLoading from 'react-loading'

const LoaderScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <ReactLoading type='bars' color='black' height={100} width={50}/>
        <h1>Please Wait...</h1>
    </div>
  )
}

export default LoaderScreen