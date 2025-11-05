import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons'
import { addApplicationAPI, getAllJobAPI } from '../../services/allAPI'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Careers = () => {
  const navigate=useNavigate()
    const[applyModalStatus,setApplyModalStatus]=useState(false)
      const[allJobs,setAllJobs]=useState([])
      const [searchKey,setSearchKey]=useState("")
      const [jobTitle,setJobTitle]=useState("")
      const [jobId,setJobId]=useState("")
      // console.log(allJobs);
      const [applicationDetails,setApplicationDetails]=useState({
        fullname:"",email:"",qualification:"",phone:"",coverLetter:"",resume:""
      })
      // reset resume input tage
      const[fileKey,setFileKey]=useState(Date.now())

      console.log(applicationDetails);
      

      useEffect(()=>{
        getAllJobs()
      },[searchKey])
      
      const handleApplyJob=(job)=>{
        setJobId(job?._id)
        setJobTitle(job.title)
        setApplyModalStatus(true)
      }

      const handleSubmitApplication= async()=>{
        const token = sessionStorage.getItem("token")
        const {fullname,email,qualification,phone,coverLetter,resume}=applicationDetails
        if(!token){
          toast.info("Please login to apply job!!")
          setTimeout(()=>{
            navigate('/login')
          },2000);
        }else if(!fullname || !email || !qualification || !phone || !coverLetter || !resume || !jobId || !jobTitle){
          toast.info ("Please fill the form completely !!!")
        }else{
          const reqHeader={
            "Authorization":`Bearer ${token}`
          }
          const reqBody= new FormData()
          for(let key in applicationDetails){
            reqBody.append(key,applicationDetails[key])
          }
          reqBody.append("jobTitle",jobTitle)
          reqBody.append("jobId",jobId)
          const result = await addApplicationAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success("Application submitted successfully !!!")
            handleReset()
            setApplyModalStatus(false)
          }else if (result.status==409){
            toast.warning(result.response.data)
            handleReset()
          }else{
            toast.error("Something went wrong !!!")
            handleReset()
            setApplyModalStatus(false)
          }
          
        }
      }

      const handleReset=()=>{
        setApplicationDetails({
          fullname:"",email:"",qualification:"",phone:"",coverLetter:"",resume:""
        })
        //reset resume input tag
        setFileKey(Date.now())
      }
    
      const getAllJobs=async()=>{
        try{
          const result= await getAllJobAPI(searchKey)
          if(result.status==200){
            setAllJobs(result.data)
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
          
        }
      }
    
    
  return (
    <>
    <Header/>
    <div className='md:px-40 my-5'>
      <div className='text-center my-5'>
        <h1 className=' text-3xl my-3'>Career</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic modi at reiciendis, blanditiis delectus neque, excepturi rerum laboriosam repudiandae, porro ipsum est quae officia aperiam. Quaerat, eius vero! Fugit, sapiente.
        Deleniti, dolore molestias? Quaerat repellat maxime perferendis labore, praesentium itaque hic! Rem iusto molestias, fuga sequi libero eius quidem facere? Officiis porro fugit earum voluptates amet, ipsum nesciunt quibusdam illum.</p>
      </div>
  
      <div className='my-5'>
        <h1 className='my-7 px-20 text-2xl'>Current Openings</h1>
        <div className='mx-20 px-50 flex justify-center items-center'>
            <input onChange={e=>setSearchKey(e.target.value)} type="text" className='w-full  shadow-lg p-2 bg-gray-100 text-black rounded-l' placeholder='Job title' />
            <button className='bg-blue-600 p-2 shadow-lg text-white cursor-pointer rounded-r px-2'>Search</button>     
      </div>

        {/* duplicate job openings */}
     {
      allJobs?.length>0 ?
      allJobs?.map(job=>(
        <div key={job?._id} className='border border-gray-200 m-10 p-5 shadow my-5'>
      <div className='flex mb-5'>
        <div className='w-full '>
          <h1>{job?.title}</h1>
          <hr />
        </div>
        <button onClick={()=>handleApplyJob(job)} className='bg-blue-600 text-white p-3 ms-5 rounded flex-items-center'>Apply<FontAwesomeIcon icon={faArrowUpRightFromSquare} /></button>
      </div>
      <p className='text-lg my-2'><FontAwesomeIcon icon={faLocationDot} />{job?.location}</p>
      <p  className='text-lg my-2'>Job Type:{job?.jobType}</p>
      <p  className='text-lg my-2'>Salary:{job?.salary}</p>
      <p  className='text-lg my-2'>Qualification:{job?.qualification}</p>
      <p  className='text-lg my-2'>Experience:{job?.experience}</p>
      <p  className='text-lg my-2'>Description:{job?.description}</p>
       </div>
      ))
      :
      <p>No job openings.</p>
     }
      </div>
    </div>

    {/* modal */}
      {
      applyModalStatus &&
        <div className='relative z-10' >
          <div className='bg-gray-500/75 fixed inset-0'>
         <div className='flex justify-center items-center min-h-screen'>
            <div style={{width:'900px'}} className='bg-white rounded-2xl'>
              {/* modal header */}
              <div className='bg-black text-white flex justify-between items-center p-3'>
                <h3>Appllication Form</h3>
                <FontAwesomeIcon onClick={()=>setApplyModalStatus(false)} icon={faXmark} />
              </div>
              {/* modal body and footer */}
              <div className=' my-5 p-5'>
              <div className=' flex justify-center items-center gap-5 mb-5'>
                <input value={applicationDetails?.fullname} onChange={e=>setApplicationDetails({...applicationDetails,fullname:e.target.value})} className='w-full border p-2 rounded-lg'  type="text" placeholder='Full name' />
                <input  value={applicationDetails?.qualification} onChange={e=>setApplicationDetails({...applicationDetails,qualification:e.target.value})} className='w-full border p-2 rounded-lg'  type="text" placeholder='Qualification' />
              </div>
               <div className='flex justify-center items-center gap-5 mb-5'>
                <input  value={applicationDetails?.email} onChange={e=>setApplicationDetails({...applicationDetails,email:e.target.value})} className='w-full border p-2 rounded-lg'  type="text" placeholder='Email ID' />
                <input  value={applicationDetails?.phone} onChange={e=>setApplicationDetails({...applicationDetails,phone:e.target.value})} className='w-full border p-2 rounded-lg'  type="text" placeholder='Phone' />
              </div>
              <textarea  value={applicationDetails?.coverLetter} onChange={e=>setApplicationDetails({...applicationDetails,coverLetter:e.target.value})} className='border rounded-lg w-full mb-5' rows={5}>Cover letter</textarea>

              <div className='flex flex-col'>
                <label htmlFor="" className='m-2'>Resume</label>
                  <input key={fileKey} onChange={e=>setApplicationDetails({...applicationDetails,resume:e.target.files[0]})} type="file" className="block w-full  text-gray-700 file:mr-4 file:py-2 file:px-4  file:rounded-md  file:bg-gray-100 file:text-gray-700 mb-5 border rounded-lg" />
              </div>
             
              </div>
               {/* modal footer */}
              <div className='text-end bg-gray-400  p-3'>
                <button onClick={handleReset} className='bg-yellow-400 text-white rounded p-2 px-5 mx-5'>Reset</button>
                <button onClick={handleSubmitApplication} className='bg-green-600 text-white rounded p-2 px-5'>Submit</button>
              </div>
         </div>
          </div>
    
          </div>    
        </div>
      }

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
    </>
  )
}

export default Careers