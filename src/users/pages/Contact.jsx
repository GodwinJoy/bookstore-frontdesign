import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Contact = () => {
  return (
    <>
    <Header/>
    <div className='md:px-40 p-5 '>
      <div className='text-center my-2'>
        <h1 className='text-3xl my-3'>Contacts</h1>
        <p className='p-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo inventore est cum dolores eaque unde quasi blanditiis quidem distinctio illo, eos eum ut beatae consequuntur adipisci vel praesentium quas eveniet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus alias necessitatibus corporis, ea eaque debitis facilis eveniet laborum nulla iusto qui, doloribus quasi facere, ipsam tenetur? Eligendi, repellendus! Aliquam, officiis?</p>
      </div>

      <div className='flex justify-evenly items-center gap-10'>

       <div className='flex  items-center my-3  '>
        <div style={{height:'50px',width:'50px',borderRadius:'50%'}} className='bg-gray-200 flex justify-evenly items-center'><FontAwesomeIcon  icon={faLocationDot} /></div>
        <p className='text-xl'>123 Man Street,Apt 48</p>
       </div>

        <div className='flex  items-center my-3 '>
        <div style={{height:'50px',width:'50px',borderRadius:'50%'}} className='bg-gray-200 flex justify-evenly items-center '><FontAwesomeIcon  icon={faPhone} /></div>
          <p className='text-xl'>+91 639835476</p>
       </div>
       
       <div className='flex  items-center my-3 '>
        <div style={{height:'50px',width:'50px',borderRadius:'50%'}} className='bg-gray-200 flex justify-evenly items-center '><FontAwesomeIcon icon={faEnvelope} /></div>
          <p className='text-xl'>bookstore@gmail.com</p>
       </div>
       
      </div>      
    </div>

    <div className='md:grid grid-cols-2 my-2 px-20 gap-10 m-20'>

      <div className='bg-gray-300 my-auto rounded shadow-lg'>
        <h1 className='text-center p-2 text-xl font-bold'>Send me Message</h1>
        <form className='p-3'>
          <input type="text" className='w-full bg-white p-1 my-2' placeholder='Name'/>
          <input className='p-1 bg-white my-2 w-full' type="text" placeholder='Email ID' />
         <textarea className='bg-white w-full my-2' name="message" rows={9}  id="" placeholder='Message'></textarea>

         <button className='text-white p-1 bg-blue-600 w-full cursor-pointer'>Send</button>
        </form>

      </div>
      <div className='mx-auto py-10'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251479.49747840138!2d76.13730642420357!3d9.98650006493665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1758774460896!5m2!1sen!2sin" width="600" height="450" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

    </div>
    <Footer/>
    </>
  )
}

export default Contact