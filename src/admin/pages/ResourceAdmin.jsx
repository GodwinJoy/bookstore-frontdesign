import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSideBar from "../components/AdminSideBar"
import { getAllUsersApi, listAllBooksApi, updateBookStatusApi } from '../../services/allAPI'
import SERVERURL from '../../services/serverURL'

function ResourceAdmin() {

  const [bookListStatus,setBookListStatus]=useState(true)
  const [usersListStatus,setUsersListStatus]=useState(false);
  const [allUsers,setAllUsers]=useState([])
  const [userBooks,setUserBooks]=useState([])
  // const [token,setToken]=useState("")
  const [updateBookStatus,setUpdateBookStatus]=useState([])
console.log(allUsers);
console.log(userBooks);


  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      // setToken(token)
      if(bookListStatus==true){
        getAllBooks(token)

      }else if(usersListStatus==true){
        getAllUsers(token)
      }else{
        console.log("Something went wrong !!");
      }
    }
  },[usersListStatus,updateBookStatus])


    const getAllBooks = async (userToken)=>{
    const reqHeader = {
      "Authorization":`Bearer ${userToken}`
    }
    try{
      const result = await listAllBooksApi(reqHeader)
      if(result.status ==200){
        setUserBooks(result.data)
      }else{
        console.log(result);
      }
    }catch(err){
      console.log(err);
      
    }
  }

  const getAllUsers = async (userToken)=>{
    const reqHeader = {
      "Authorization":`Bearer ${userToken}`
    }
    try{
      const result = await getAllUsersApi(reqHeader)
      if(result.status ==200){
        setAllUsers(result.data)
      }else{
        console.log(result);
      }
    }catch(err){
      console.log(err);
      
    }
  }

  const approveBook=async(book)=>{
    const userToken=sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization":`Bearer ${userToken}`
  }
  try{
    const result= await updateBookStatusApi(book,reqHeader)
    if(result.status==200){
      setUpdateBookStatus(result.data)
    }
  }catch(err){
    console.log(err);
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
        
          <h1 className='text-3xl text-center font-bold'>All Collections</h1>
      
        {/* tabs */}
         <div className='flex justify-center items-center my-8 font-medium text-lg'>
            <p onClick={()=>{setBookListStatus(true);setUsersListStatus(false);}} className={bookListStatus?'text-blue-500 p-4 border-gray-400 border-t border-l border-r rounded cursor-pointer':'p-4 border-b border-gray-200 cursor-pointer'} >Books</p>
            <p onClick={()=>{setUsersListStatus(true);setBookListStatus(false);}} className={usersListStatus ?'text-blue-500 p-4 border-gray-400 border-t border-l border-r rounded cursor-pointer':'p-4 border-b border-gray-200 cursor-pointer'} >Users</p>
          
          </div>
          {/* contents */}
          {
            bookListStatus &&
            <div className='md:grid grid-cols-4 w-full my-5 '>
              {
                userBooks?.length>0?
                userBooks?.map((book)=>(
                <div key={book?._id} class="shadow-lg rounded-lg p-3 m-4">
            <img  width={'100%'} height={'300px'} src={book?.imageUrl} alt="" />
            <div className="flex flex-col justify-center items-center mt-4">
              <h5 className="mb-2 pt-2 text-blue-700">{book?.author}</h5>
              <h5>{book?.title}</h5>
              <h5>Rs. {book?.discountPrice}</h5>
              <div className='w-full text-center mt-2'>
                {
                  book?.status=="pending"&&
                  <button onClick={()=>approveBook(book)} className='p-2 text-white rounded bg-green-700 w-full'>Approve</button>     
                }
                {
                  book?.status=="approved" &&
                <div className='flex justify-end'>
                  <img width={'40px'} height={'40px'} src="https://cdn-icons-png.freepik.com/512/11601/11601272.png" alt=" tick" />

                </div>
                }
              </div>
            </div>
          </div>
                ))
                :
                <div>No Books</div>
              }
  
        </div>
          }

           {
            usersListStatus &&
            <div className='md:grid grid-cols-3 w-full my-5 '>
              {/* duplicate */}

              {
                allUsers?.length>0?
                allUsers?.map((user,index)=>(
                  <div key={index} class="shadow-lg rounded-lg p-3 m-4 bg-gray-300">
            <h5 class=" text-red-700 font-bold text-lg">ID: {user?._id}</h5>
           <div className='flex items-center mt-3'>
              <img  width={'100px'} height={'100px'} style={{borderRadius:"50%"}} src={user?.profile? `${SERVERURL}/uploads/${user?.profile}`:"/usericon.png"} alt="userPic" />
              <div class="flex flex-col  ml-6">
                
                <h5 className='text-blue-600'>{user?.username}</h5>
                <h5>{user?.email}</h5>
           </div>
            </div>
          </div>
                ))
                :
                <div>No users</div>
              }
  
        </div>
          }

 

      </div>
    </div>
    </>
  )
}

export default ResourceAdmin