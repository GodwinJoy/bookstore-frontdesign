import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { userAuthContext } from '../../contextAPI/AuthContext'

function AdminHeader() {
  const {role,authorisedUser,setAuthorisedUser}=useContext(userAuthContext)
  const navigate=useNavigate()

  const logout=()=>{
    sessionStorage.clear()
    setAuthorisedUser(false)
    navigate('/')
  }
  return (
    
    <>
    <div className='flex justify-between items-center px-30 p-2'>
      {/* logo */}
      <div className='flex items-center'>
        <img width={'40px'} height={'40px'} src="/logo.png" alt="logo" />
        <h1 className='text-2xl font-bold ms-2 '>Bookstore</h1>
      </div>


      {/* logout block */}
      <Link to={'/login'}><button onClick={logout} className='border border-black rounded px-3 py-2 ms-3 hover:bg-black hover:text-white'><FontAwesomeIcon className='px-2' icon={faPowerOff} />Logout</button></Link>
      </div>
    

    <div className='bg-gray-700 p-2 text-center text-white'>
     <marquee> <p>Welcome, Admin! You are all set to manage and monitor the system. Lets get to work! </p></marquee>
    </div>

   
    </>
  )
}

export default AdminHeader