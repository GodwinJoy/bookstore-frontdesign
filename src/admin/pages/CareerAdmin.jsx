import React, { useContext, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSideBar from '../components/AdminSideBar'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import AddJob from '../components/AddJob'
import { useEffect } from 'react'
import { getAllApplicationAPI, getAllJobAPI, removeJobAPI } from '../../services/allAPI'
import { jobContext } from '../../contextAPI/ContextShare'
import SERVERURL from '../../services/serverURL'


function CareerAdmin() {
  const {addJobResponse,setAddJobResponse}=useContext(jobContext)

  const [jobListStatus,setJobListStatus]=useState(true)
  const [listApplicationStatus,setListApplicationStatus]=useState(false)
  const[allJobs,setAllJobs]=useState([])
  const [searchKey,setSearchKey]=useState("")
  const[deleteJobResponse,setDeleteJobResponse]=useState([])
  const [application,setApplication]=useState([])
  // console.log(application);
  
  console.log(allJobs);
  


  useEffect(()=>{
    if(jobListStatus==true){
      getAllJobs()
    }else if(listApplicationStatus==true){
      getApplications()
    }
  },[searchKey,deleteJobResponse,addJobResponse,listApplicationStatus])



  const getApplications=async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      // api call
      const result = await getAllApplicationAPI(reqHeader)
      if(result.status==200){
        setApplication(result.data)
      }else{
        console.log(result);
        
      }
    }

  }

  const getAllJobs=async()=>{
    try{
      const result= await getAllJobAPI(searchKey)
      if(result.status==200){
        setAllJobs(result.data)
      }
    }catch(err){
      console.log(err);
      
    }
  }

  const removeJob=async(id)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      try{
        const result= await removeJobAPI(id,reqHeader)
        if(result.status==200){
          setDeleteJobResponse(result.data)
        }else{
          console.log(result);
        }
      }catch(err){
        console.log(err);
        
      }
    }
  }



  return (
          <>
     <AdminHeader/>
    <div className='md:grid grid-cols-5 gap-2'>
      <div className='col-span-1'>
        <AdminSideBar/>
      </div>
      <div className='col-span-4 p-10'>
        
          <h1 className='text-3xl text-center font-bold'>Careers</h1>
        
        {/* tabs */}
         <div className='flex justify-center items-center my-5'>
            <p onClick={()=>{setJobListStatus(true);setListApplicationStatus(false);}} className={jobListStatus?'text-blue-500 p-4 border-gray-400 border-t border-l border-r rounded cursor-pointer':'p-4 border-b border-gray-200 cursor-pointer'} >Job Post</p>
            <p onClick={()=>{setListApplicationStatus(true);setJobListStatus(false);}} className={listApplicationStatus ?'text-blue-500 p-4 border-gray-400 border-t border-l border-r rounded cursor-pointer':'p-4 border-b border-gray-200 cursor-pointer'} >View Applicants</p>
          
          </div>
          {/* contents */}
          {
            jobListStatus &&
            <div>
              <div className='flex justify-between items-center my-5'>
                <div className='flex px-10'>
                  <input onChange={e=>setSearchKey(e.target.value)} type="text" className='w-75  shadow-lg  p-2 bg-gray-100 text-black rounded-lg' placeholder='Search by job title' />
            <button className='bg-blue-600 p-2 shadow-lg text-white cursor-pointer rounded-r px-2'>Search</button>  
                </div>
                <AddJob/>

              </div>

           {/* duplicate job openings */}
         {
          allJobs?.length>0?
          allJobs?.map(job=>(
            <div key={job?._id} className='border border-gray-200 m-10 p-5 shadow my-5'>
      <div className='flex mb-5'>
        <div className='w-full '>
          <h1>{job?.title}</h1>
          <hr />
        </div>
        <button onClick={()=>removeJob(job?._id)}  className='bg-red-600 text-white p-3 ms-5 rounded flex-items-center'>Delete<FontAwesomeIcon icon={faTrash} /></button>
      </div>
      <p className='text-lg text-blue-700 my-2'><FontAwesomeIcon icon={faLocationDot} />{job?.location}</p>
      <p  className='text-lg my-2'>Job Type:{job?.jobType}</p>
      <p  className='text-lg my-2'>Salary:{job?.salary}</p>
      <p  className='text-lg my-2'>Qualification:{job?.qualification}</p>
      <p  className='text-lg my-2'>Experience:{job?.experience}</p>
      <p  className='text-lg my-2'>Description: {job?.description}</p>
          </div>
          ))
          :
          <p>No job openings</p>
         }
            </div>
          }
          

          {
            listApplicationStatus &&
            <div className='p-10 overflow-x-hidden'>
              <table className='w-full my-3 shadow'>
                <thead>
                  <tr>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Sl No:</th>
                     <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Job Title</th>
                      <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Name</th>
                       <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Qualification</th>
                        <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Email</th>
                         <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Phone</th>
                          <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Cover</th>
                           <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    application?.length>0?
                    application?.map((item,index)=>(
                      <tr key={item?._id}>
                    <td className='border border-gray-500 p-3 text-center'>{index+1}</td>
                    <td className='border border-gray-500 p-3 text-center'>{item?.jobTitle}</td>
                    <td className='border border-gray-500 p-3 text-center'>{item?.fullname}</td>
                    <td className='border border-gray-500 p-3 text-center'>{item?.qualification}</td>
                    <td className='border border-gray-500 p-3 text-center'>{item?.email}</td>
                    <td className='border border-gray-500 p-3 text-center'>{item?.phone}</td>
                    <td className='border border-gray-500 p-3 text-center'>{item?.coverLetter}</td>
                    <td className='border border-gray-500 p-3 text-center'><Link className="text-blue-500 underline" to={`${SERVERURL}/pdf/${item?.resume}`} target='_blank' >Resume</Link></td>
                    </tr>
                    ))
                    :
                    <p>No applications</p>
                  }
                </tbody>

              </table>
              
            </div>
          }

      </div>
    </div>
      <Footer/>
    </>
  )
}

export default CareerAdmin