import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PaymentError() {
  return (
    <>
    <Header/>
    <div className='container my-10'>
        <div className='md:grid grid-cols-2 px-20 justify-center items-center'>
            <div>
                <h1 className='md:text-4xl text-blue-600'>Sorry! Your payment is unsuccessful...!!!</h1>
                <p className='text-2xl my-4'>
                    We apologize for the inconvenience caused appreciate...
                </p>
                <Link to={'/all-books'} className='bg-blue-800 px-4 py-3 text-white my-5'><FontAwesomeIcon icon={faBackward}/>Explore more books</Link>
            </div>
            <div className='flex justify-center items-center'>
                <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="success" />
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default PaymentError