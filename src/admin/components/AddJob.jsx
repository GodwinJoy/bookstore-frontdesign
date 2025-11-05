import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import { jobContext } from '../../contextAPI/ContextShare'
import { addJobAPI } from '../../services/allAPI'

function AddJob() {
  const{addJobResponse,setAddJobResponse}=useContext(jobContext)
  const[applyModalStatus,setApplyModalStatus]=useState(false)
  const[newJob,setNewJob]=useState({
    title:"",location:"",jobType:"",salary:"",qualification:"",experience:"",description:""
  })

  const handleReset=()=>{
    setNewJob({
      title:"",location:"",jobType:"",salary:"",qualification:"",experience:"",description:""
    })

  }

  const handleAddJob=async()=>{
    const token =sessionStorage.getItem("token")
    const {title,location,jobType,salary,qualification,experience,description}=newJob
    if(!title || !location || !jobType || !salary || !qualification || !experience || !description){
      toast.info("Please fill the form completely!!!")
    }else if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      // api call
      try{
        const result = await addJobAPI(newJob,reqHeader)
        if(result.status==200){
          // alert job add
          toast.success("Current job added successfully!!!")
          // reset data
          handleReset()
          // share data to context
          setAddJobResponse(result.data)
          // close modal
          setApplyModalStatus(false)
        }else if(result.status==400){
          toast.warning(result.response.data)
          handleReset()
        }else{
          toast.error("Something went wrong!!")
        }
      }catch(err){
        console.log(err);
        toast.warning("Something went wrong")
      }
    }
    else{
      toast.warning("Something went wrong")
    }
  }


  return (
    <div>
      <div className=''>
        <button  onClick={()=>setApplyModalStatus(true)} className='border border-blue-500 p-2 text-blue-700 hover:text-white rounded me-10 cursor-pointer shadow'>Add Job</button>
      </div>
       {/* modal */}
      {
      applyModalStatus &&
        <div className='relative z-10' >
          <div className='bg-gray-500/75 fixed inset-0'>
         <div className='flex justify-center items-center min-h-screen'>
            <div style={{width:'500px'}} className='bg-white rounded-2xl'>
              {/* modal header */}
              <div className='bg-black text-white flex justify-between items-center p-3'>
                <h3>Appllication Form</h3>
                <FontAwesomeIcon onClick={()=>setApplyModalStatus(false)} icon={faXmark} />
              </div>
              {/* modal body and footer */}
              <div className=' space-y-3 my-5 p-5'>
              
                <input value={newJob.title} onChange={e=>setNewJob({...newJob,title:e.target.value})} className='w-full border p-2 rounded-lg'  type="text" placeholder='Job Title' />
                <input value={newJob.location} onChange={e=>setNewJob({...newJob,location:e.target.value})} className='w-full border p-2 rounded-lg'  type="text" placeholder='Location' />
                <input value={newJob.jobType} onChange={e=>setNewJob({...newJob,jobType:e.target.value})} className='w-full border p-2 rounded-lg'  type="text" placeholder='Job Type' />
                <input value={newJob.salary} onChange={e=>setNewJob({...newJob,salary:e.target.value})} className='w-full border p-2 rounded-lg'  type="text" placeholder='Salary' />
                <input value={newJob.qualification} onChange={e=>setNewJob({...newJob,qualification:e.target.value})} className='w-full border p-2 rounded-lg'  type="text" placeholder='Qualification' />
                <input value={newJob.experience} onChange={e=>setNewJob({...newJob,experience:e.target.value})} className='w-full border p-2 rounded-lg'  type="text" placeholder='Experience' />
                <textarea value={newJob.description} onChange={e=>setNewJob({...newJob,description:e.target.value})}placeholder='Description' className='border rounded-lg w-full mb-5 placeholder:p-2' rows={4}></textarea>
              </div>
               {/* modal footer */}
              <div className='text-end bg-gray-400  p-3'>
                <button onClick={handleReset} className='bg-yellow-400 text-white rounded p-2 px-5 mx-5'>Reset</button>
                <button  onClick={handleAddJob}className='bg-green-600 text-white rounded p-2 px-5'>Add</button>
              </div>
         </div>
          </div>
    
          </div>    
        </div>
      }
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

export default AddJob