import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import SERVERURL from '../../services/serverURL'
import { userUpdateContext } from '../../contextAPI/ContextShare';
import { userAuthContext } from '../../contextAPI/AuthContext';



const Header = () => {
  const{role,authorisedUser,setAuthorisedUser}=useContext(userAuthContext)
  // state to control visibility of menu list
  const [listStatus,setListStatus]=useState(false)
// state to hold token
const [token,setToken]=useState("");
// state to control dp
const [userDp,setUserDp]=useState("")
// state for dropdwon status
const[dropdownStatus,setDropdownStatus]=useState(false)

const navigate=useNavigate()

const {userEditResponse}=useContext(userUpdateContext)

useEffect(()=>{
  if(sessionStorage.getItem("token")){
    const token=sessionStorage.getItem("token")
    setToken(token)
    const user= JSON.parse(sessionStorage.getItem("user"))
    setUserDp(user.profile)
  }
},[token,userEditResponse])

// for logout
const logout=()=>{
  sessionStorage.clear()
  setAuthorisedUser(false)
  setToken("")
  setUserDp("")
  setDropdownStatus(false)
  navigate('/')

}

  return (
    <>
    <div className='grid grid-cols-3 p-3'>
      {/* logo */}
      <div className='flex items-center'>
        <img width={'40px'} height={'40px'} src="/logo.png" alt="logo" />
        <h1 className='text-2xl font-bold ms-2 md:hidden'>Bookstore</h1>
      </div>

      {/* title */}
      <div className='md:flex justify-center items-center hidden'>
        <h1 className='text-3xl font-bold'>BOOKSTORE</h1>
      </div>

      {/* login block */}
     <div className='md:flex justify-end items-center hidden'>

      <FontAwesomeIcon icon={faInstagram} />
      <FontAwesomeIcon icon={faXTwitter} />
      <FontAwesomeIcon  icon={faFacebook} />

      {/* login link */}
      {!token?
        <Link to={'/login'}><button className='border border-black rounded px-3 py-2 ms-3 hover:bg-black hover:text-white'><FontAwesomeIcon className='me-1' icon={faUser} />Login</button></Link>
        :
       <div  className='relative inline-block text-left'>         
                  <button  onClick={()=>setDropdownStatus(!dropdownStatus)} className=' w-full bg-white px-3 py-2  shadow-xs hover:bg-gray-50 '>
                    <img width={'40px'} height={'40px'} style={{borderRadius:'50%'}} className='mx-2' src={userDp==""?"https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png":userDp.startsWith("https://lh3.googleusercontent.com/")?userDp:`${SERVERURL}/uploads/${userDp}`} alt="user" />
                  </button>
                  {
                  dropdownStatus &&
                  <div className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden'>
                      <div className="py-1">
                      <Link className='block px-4 py-2 text-sm text-gray-700' to={'/profile'}><p><FontAwesomeIcon icon={faAddressCard} className='me-2'/>Profile</p></Link>
                      <button onClick={logout} className='block px-4 py-2 text-sm text-gray-700'><FontAwesomeIcon icon={faPowerOff} className='me-2'/>Logout</button>
                    </div>
                  </div>
              }
            
          </div>
       
        }
      </div>
    </div>

    <nav className='w-full p-3 bg-black text-white md:flex justify-center items-center'>
      {/* menubar & login */}
      <div className='flex justify-between items-center md:hidden'>
        <button onClick={()=>setListStatus(!listStatus)}><FontAwesomeIcon icon={faBars} /></button>
        
      {/* login link */}

      {
        !token ?
        <Link to={'/login'}><button className='border border-black rounded px-3 py-2 ms-3 hover:bg-black hover:text-white' ><FontAwesomeIcon className='me-1' icon={faUser} />Login</button></Link>
        :
        <div className='relative inline-block text-left'>         
                  <button onClick={()=>setDropdownStatus(!dropdownStatus)} className=' w-full bg-white px-3 py-2  shadow-xs hover:bg-gray-50'>
                    <img width={'40px'} height={'40px'} style={{borderRadius:'50%'}} className='mx-2' src={userDp==""?"https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png":userDp.startsWith("https://lh3.googleusercontent.com/")?userDp:`${SERVERURL}/uploads/${userDp}`} alt="user" />
                  </button>
                  {
                  dropdownStatus &&
                  <div className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden'>
                      <div className="py-1">
                      <Link className='block px-4 py-2 text-sm text-gray-700' to={'/profile'}><p><FontAwesomeIcon icon={faAddressCard} className='me-2'/>Profile</p></Link>
                      <button onClick={logout} className='block px-4 py-2 text-sm text-gray-700'><FontAwesomeIcon icon={faPowerOff} className='me-2'/>Logout</button>
                    </div>
                  </div>
              }
            
          </div>
       
        
      }

      </div>
  
      <ul className={listStatus?'flex flex-col':'md:flex justify-center items-center hidden'}>
        <li className='md:mx-4 mt-3 md:mt-0'><Link to={'/'} >Home</Link></li>
        <li className='md:mx-4 mt-3 md:mt-0'><Link to={'/all-books'} >Books</Link></li>
        <li className='md:mx-4 mt-3 md:mt-0'><Link to={'/careers'} >Careers</Link></li>
        <li className='md:mx-4 mt-3 md:mt-0'><Link to={'/contact'} >Contact</Link></li>
      
      </ul>
    </nav>
    </>
  )
}

export default Header