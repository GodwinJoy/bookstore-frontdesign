import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
   <>
      <div className='grid grid-cols-3 gap-4 bg-gray-900 text-white p-4 mt-5 text-center'>
        <div className='p-2 my-5 text-start'>
          <h1 className='my-5 text-2xl'>ABOUT US</h1>
          <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, voluptas, rem voluptatem quis ipsum, amet perferendis magni vero est alias itaque quidem reprehenderit. Saepe, excepturi? Ea eum fugiat corporis omnis.</p>
        </div>
        <div className='p-2 my-5'>
          <h1 className='my-5 text-2xl'>NEWSLETTER</h1>
          <h4>Stay updated with latest trends</h4>
         <div >
           <input type="text"  className=' bg-gray-100 text-black'/>
          <button className='my-2 bg-yellow-200 text-black cursor-pointer'><FontAwesomeIcon className='mx-1' icon={faArrowRight} /></button>
         </div>
        </div>
        <div className='p-2 my-5 '>
          <h1 className='my-5 text-2xl'>FOLLOW US </h1>
          <h4>Let us be social</h4>
          <div className='text-2xl my-2 '>
            {/* instagram */}
            <FontAwesomeIcon className='me-2 cursor-pointer' icon={faInstagram} />
            {/* twitter */}
            <FontAwesomeIcon className='me-2 cursor-pointer' icon={faXTwitter} />
            {/* facebook */}
            <FontAwesomeIcon className='me-2 cursor-pointer' icon={faFacebook} />
            {/* linkedin */}
            <FontAwesomeIcon className='cursor-pointer' icon={faLinkedin} />
          </div>
           </div>
        
      </div>

      <div className='bg-gray-500 text-center text-white p-3'>
        <p>Copyright @ 2025 All rights reserved </p>

      </div>
   </>
  )
}

export default Footer