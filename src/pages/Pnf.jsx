import React from 'react'
import { Link } from 'react-router-dom'
const Pnf = () => {
  return (
    <div>
          <h1 className='text-center text-xl my-5'>Sorry, this page doesn't exist!</h1>
      <div className='flex flex-col justify-center items-center my-5'>
        <img src="https://assets-v2.lottiefiles.com/a/6915cc2c-1178-11ee-a783-6b784bd85af7/vUmMyG7Nho.gif" alt=""  style={{height:'400px'}}/>

        <Link to={'/'} className='rounded p-2 bg-green-600 text-white'>Go Back</Link>
      </div>
    </div>
  )
}

export default Pnf