import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faGear, faGraduationCap, faHouse} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { adminUpdateContext } from '../../contextAPI/ContextShare'
import SERVERURL from '../../services/serverURL'

function AdminSideBar() {
  const {adminEditResponse,setAdminEditResponse}=useContext(adminUpdateContext)
  const [dp,setDp]=useState("")
  const[adminName,setAdminName]=useState("")

  
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user =JSON.parse(sessionStorage.getItem("user"))
      setDp(user.profile)
      setAdminName(user.username)
    }
  },[adminEditResponse])
  return (
    <div className='bg-blue-200 min-h-screen  md:flex text-center flex-col py-10 mt-5'>
      <div className='flex justify-center'>
        <img style={{width:'150px',height:'150px',borderRadius:'50%'}} src={dp==""?"https://cdn-icons-png.flaticon.com/512/428/428573.png":`${SERVERURL}/uploads/${dp}`} alt="adminuser" /></div>
      <h1 className='text-xl font-bold'>{adminName}</h1>

      
        <div className='md:text-left mx-auto mt-10'>
          <div className='mt-3'>
            <input type="radio" id='home' name='filter' />
            <label className='ms-3' htmlFor="home"><Link to={'/admin-dashboard'}><FontAwesomeIcon icon={faHouse} />Home</Link></label>
          </div>
          <div className='mt-3'>
            <input type="radio" id='resources' name='filter' />
            <label className='ms-3' htmlFor="resources"><Link to={'/admin-resources'}><FontAwesomeIcon icon={faBook} />Resources</Link></label>
          </div>
          <div className='mt-3'>
            <input type="radio" id='careers' name='filter' />
            <label className='ms-3' htmlFor="careers"><Link to={'/admin-careers'}><FontAwesomeIcon icon={faGraduationCap} />Careers</Link></label>
          </div>
          <div className='mt-3'>
            <input type="radio" id='mystery' name='filter' />
            <label className='ms-3' htmlFor="mystery"><Link to={'/admin-settings'}><FontAwesomeIcon icon={faGear} />Settings</Link></label>
          </div>

        </div>
      </div>


    
  )
}

export default AdminSideBar