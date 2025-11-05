import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import {googleLoginAPI, registerAPI} from '../services/allAPI'
import { loginAPI } from '../services/allAPI'
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google'
import { userAuthContext } from '../contextAPI/AuthContext'

// import { GoogleLogin,GoogleOAuthProvider } from '@react-oauth/google';


const Auth = ({register}) => {

  const{role,authorisedUser,setAuthorisedUser}=useContext(userAuthContext)
  const [userDetails,setUserDetails]=useState({username:"",email:"",password:""})

  const[viewPasswordStatus,setViewPasswordStatus]=useState(false)
  const navigate=useNavigate()
  // console.log(userDetails);

  // register button  function
 
  const handleRegister=async()=>{
    // console.log("inside the register");
    const{username,email,password}=userDetails
    if(!username || !email || !password){
      toast.info("Please fill the form completely!!")
    }else{
      // toast.success("Proceed to API call")
      try{
        const result=await registerAPI(userDetails)
        console.log(result);
        if(result.status==200){
           toast.success("User registered successfully!!! Please login..")
           setUserDetails({username:"",email:"",password:""})
           navigate('/login')
        }else if(result.status==409){
          toast.warning(result.response.data)
          setUserDetails({username:"",email:"",password:""})
          navigate('/login')
        }else{
          // console.log(result);
          toast.error("Something went wrong!!!")
          setUserDetails({username:"",email:"",password:""})          
        }
        

      }catch(err){
        console.log(err);
        
      }
    }
  }

  const handleLogin=async()=>{
     const{email,password}=userDetails
    if(!email || !password){
      toast.info("Please fill the form completely!!")
  }else{
      // toast.success("Proceed to API call")
      try{
        const result =await loginAPI(userDetails)
        console.log(result);
        if(result.status==200){
           toast.success("Login Successfull")
           sessionStorage.setItem("user",JSON.stringify(result.data.user))
           sessionStorage.setItem("token",result.data.token)
           setAuthorisedUser(true)
           setTimeout(()=>{
            if(result.data.user.role=="admin"){
              navigate('/admin-dashboard')
            }else{
              navigate('/')
            }
           },2500);
        }else if(result.status==401){
         toast.warning(result.response.data)
         setUserDetails({username:"",email:"",password:""})
        }else if(result.status==404){
          toast.warning(result.response.data)
          setUserDetails({username:"",email:"",password:""})
        }
        else{
          toast.error("Something went wrong!!!")
          setUserDetails({username:"",email:"",password:""})
        }
      }catch(err){
        console.log(err);
        
      }
  }
}

// for handling google login
const handleGoogleLogin= async(credentialResponse)=>{
  console.log("Inside handleGoogleLogin");
  const credential=credentialResponse.credential
  const details=jwtDecode(credential)
  console.log(details);
  try{
      const result = await googleLoginAPI({username:details.name,email:details.email,password:'googlepswd',profile:details.picture})
      console.log(result);
      if(result.status==200){
           toast.success("Login Successfull")
           sessionStorage.setItem("user",JSON.stringify(result.data.user))
           sessionStorage.setItem("token",result.data.token)
           setAuthorisedUser(true)
           setTimeout(()=>{
            if(result.data.user.role=="admin"){
              navigate('/admin-dashboard')
            }else{
              navigate('/')
            }
           },2500);
          }else{
            toast.error("Something went wrong!!!")
          }
      

  }catch(err){
    console.log(err);
    
  }
  
  
}

  return (
    <div className='w-full min-h-screen flex justify-center items-center flex-col bg-[url(/authbg.jpg)] bg-cover -bg-center '>
      <div className='p-10'>
        <h1 className='text-center font-bold text-3xl'>BOOK STORE</h1>
        <div className='bg-gray-800 p-5 text-white rounded'>
          <img className='mx-auto' height={'50px'} width={'50px'} src="/usericon.png" alt="logouser" />
          <h1 className='text-center my-2'>{register?"Register":"Login"}</h1>

         <form className=''>
          {
            register &&
            <input value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} className='w-full my-2 bg-gray-200 p-1 placeholder-gray-700 text-black' type="text" placeholder='Username' />

          }
            <input value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} className='w-full my-2 bg-gray-200 p-1 placeholder-gray-700 text-black' type="text" placeholder='Email Id' />

            <div className='flex items-center'>
              <input value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})}  className='w-full my-2 bg-gray-200 p-1 placeholder-gray-700 text-black' type={viewPasswordStatus?"text":"password"} placeholder='Password'/>

              {!viewPasswordStatus?
              <FontAwesomeIcon onClick={(()=>setViewPasswordStatus(!viewPasswordStatus))} className='text-gray-500' icon={faEye} style={{marginLeft:'-30'}}/>:
              <FontAwesomeIcon onClick={(()=>setViewPasswordStatus(!viewPasswordStatus))} className='text-gray-500' icon={faEyeSlash} style={{marginLeft:'-30'}}/>
              }
            </div>
            <div className='flex justify-between text-sm'>
              <p className='text-blue-700'>Never share password with other</p>
              <button className='text-sm underline text-yellow-300'>Forgot Password</button>
            </div>
            
            <div className='text-center'>
              {
                register?
                <button type='button' onClick={handleRegister} className='bg-green-800 w-full p-1 my-2'>Register</button>
                :
                <button type='button' onClick={handleLogin}  className='bg-green-800 w-full p-1 my-2'>Login</button>
              }
            </div>
         </form>
         {/* google authentication */}
         <div className='my-5 text-center'>
          {!register && <p>.........or........</p>}
          {!register && <div className='my-5 flex justify-center w-full'>
            <GoogleLogin
            onSuccess={credentialResponse =>{
              console.log(credentialResponse);
              handleGoogleLogin(credentialResponse)
            }}
            onError={()=>{
              console.log('Login Failed');
              
            }}
            />
            </div>}

         </div>


        
       <div className='my-3 text-center'>
           {
            register?
            <p className='text-blue-700 '>Are you already a user? <Link className='underline' to={'/login'}>Login</Link></p>
            :
            <p className='text-blue-700'>Are you a new user? <Link className='underline' to={'/register'}>Register</Link></p>
           }
       </div>

        </div>
      </div>

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

export default Auth