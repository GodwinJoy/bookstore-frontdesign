import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSideBar from '../components/AdminSideBar'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import SERVERURL from '../../services/serverURL'
import { ToastContainer,toast } from 'react-toastify'
import { updateAdminProfileAPI } from '../../services/allAPI'
import { adminUpdateContext } from '../../contextAPI/ContextShare'



function SettingAdmin() {
      const {adminEditResponse,setAdminEditResponse}=useContext(adminUpdateContext)
      const [adminDetails,setAdminDetails]=useState({username:"",password:"",cpassword:"",profile:""})
      const [existingProfilePic,setExistingProfilePic]=useState("")
      const [preview,setPreview]=useState("")

      useEffect(()=>{
        if(sessionStorage.getItem("user")){
          const user =JSON.parse(sessionStorage.getItem("user"))
          setAdminDetails({...adminDetails,username:user.username,password:user.password,cpassword:user.password })
          setExistingProfilePic(user.profile)
        }
      },[])

      const handleUploadProfilePic=(e)=>{
         setAdminDetails({...adminDetails,profile:e.target.files[0]})
         const url=URL.createObjectURL(e.target.files[0])
         setPreview(url)
      }

      const handleReset=()=>{
        const user =JSON.parse(sessionStorage.getItem("user"))
          setAdminDetails({profile:"",username:user.username,password:user.password,cpassword:user.password })
          setExistingProfilePic(user.profile)
          setPreview("")
      }

      const handleUpdateAdminProfile= async()=>{
        const {username,password,cpassword,profile}=adminDetails
        if(!username || !password || !cpassword){
          toast.info("Please fill the form completely !!!")
        }else if(password !=cpassword){
          toast.warning("Password and confirm password must be same!!")
          handleReset()
        }else{
          const token =sessionStorage.getItem("token")
          const reqHeader={
            "Authorization":`Bearer ${token}`
          }
          const reqBody =new FormData()
          reqBody.append("username",username)
          reqBody.append("password",password)
          reqBody.append("bio","")
          preview?reqBody.append("profile",profile):reqBody.append("profile",existingProfilePic)
          try{
            const result= await updateAdminProfileAPI(reqBody,reqHeader)
              if(result.status==200){
                sessionStorage.setItem("user",JSON.stringify(result.data))
                toast.success("Profile updation completed successfully!!!")
                setAdminEditResponse(result.data)
                handleReset()
                
              }else{
                console.log(result);
                handleReset()
              }
          }catch(err){
            console.log(err);
            toast.error("Something went wrong!!!")
          }
        }
      }
  return (
    <div> 
     <AdminHeader/>
      <div className='md:grid grid-cols-5 gap-2 '>
        <div className='col-span-1'>
          <AdminSideBar/>
        </div>
        <div className='col-span-4'>
        <h1 className='text-2xl text-center my-10'>Settings</h1>
        <div className='md:grid grid-cols-2 gap-5 m-5'>
          <div>
            <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, optio? Illum aliquid ab, excepturi maiores reprehenderit dolorum odio consectetur amet deleniti illo earum explicabo adipisci sint, commodi hic blanditiis libero?
            Recusandae harum in nisi laudantium tempore laborum veritatis veniam, magnam consequuntur placeat possimus nihil ea nulla perferendis atque ipsum fuga nobis accusantium, illum vero earum? Nobis sed autem maxime aliquid.</p>
             <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, optio? Illum aliquid ab, excepturi maiores reprehenderit dolorum odio consectetur amet deleniti illo earum explicabo adipisci sint, commodi hic blanditiis libero?
            Recusandae harum in nisi laudantium tempore laborum veritatis veniam, magnam consequuntur placeat possimus nihil ea nulla perferendis atque ipsum fuga nobis accusantium, illum vero earum? Nobis sed autem maxime aliquid.</p>
          </div>
             <div className='rounded bg-blue-100 p-10 flex justify-center items-center flex-col'>
             <input onChange={e=>handleUploadProfilePic(e)} type="file" name="" id="adminPic" className='hidden'/>
            <label htmlFor="adminPic">
              {
                existingProfilePic?
                <img style={{height:'200px',width:'200px',borderRadius:'50%'}} src={preview?preview:`${SERVERURL}/uploads/${existingProfilePic}`} alt="adminprofile" />
                :
                <img style={{height:'200px',width:'200px',borderRadius:'50%'}} src={preview?preview:"https://cdn-icons-png.flaticon.com/512/428/428573.png"} alt="adminprofile" />
              }
              <FontAwesomeIcon icon={faPen} style={{marginLeft:'140px',marginTop:'-100px'}} className='bg-yellow-200 text-white p-2 rounded' />
            </label>
            <div className='mb-3 w-full'>
              <input value={adminDetails.username} onChange={e=>setAdminDetails({...adminDetails,username:e.target.value})} type="text" className='p-2 bg-white border-gary-200 text-black w-full rounded placeholder-gray-600' placeholder='username' />
            </div>
              <div className='mb-3 w-full'>
              <input value={adminDetails.password} onChange={e=>setAdminDetails({...adminDetails,password:e.target.value})} type="text" className='p-2 bg-white border-gary-200 text-black w-full rounded placeholder-gray-600' placeholder='password' />
            </div>
              <div className='mb-3 w-full'>
              <input value={adminDetails.cpassword} onChange={e=>setAdminDetails({...adminDetails,cpassword:e.target.value})} type="text" className='p-2 bg-white border-gary-200 text-black w-full rounded placeholder-gray-600' placeholder='confirm password' />
            </div>
            <div className='my-3 w-full flex justify-evenly '>
              <button onClick={handleReset} className='bg-red-500 p-1 rounded text-white'>Reset</button>
              <button onClick={handleUpdateAdminProfile} className='bg-green-500 p-1 rounded text-white '>Update</button>

            </div>
          </div>

        </div>
        </div>

      </div>
      <Footer/>
       {/* toast alert */}
            <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
    </div>
  )
}

export default SettingAdmin