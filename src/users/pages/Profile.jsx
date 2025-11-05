import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import { addBookAPI, getAllUserPurchasedBooksAPI, getAllUserUploadBooksAPI, removeUserUploadBookAPI } from '../../services/allAPI'
import Edit from '../components/Edit'
import SERVERURL from '../../services/serverURL'
import { userUpdateContext } from '../../contextAPI/ContextShare'

function Profile() {
   const [sellBookStatus,setSellBookStatus]=useState(true)
  const [bookStatus,setBookStatus]=useState(false)
  const [purchaseStatus,setPurchaseStatus]=useState(false)
  const [bookDetails,setBookDetails]=useState({
    title:"",author:"",noOfPages:"",imageUrl:"",price:"",discountPrice:"",abstract:"",publisher:"",language:"",isbn:"",category:"",uploadImg:[]
  })
 
  // console.log(bookDetails);
  const[preview,setPreview]=useState("")
  const[previewList,setPreviewList]=useState([])

  const handleUploadBookImage = (e)=>{
    // console.log(e.target.files[0]);
    
    const fileArray=bookDetails.uploadImg
    fileArray.push(e.target.files[0])
    setBookDetails({...bookDetails,uploadImg:fileArray})
    const url=URL.createObjectURL(e.target.files[0])
    setPreview(url)
    // console.log(url);
    const bookImgArray=previewList
    bookImgArray.push(url)
    setPreviewList(bookImgArray)


  }
  
// state for token when this page is opened by logged in user
const [token,setToken]=useState("")
const [userBooks,setUserBooks]=useState([])
const [deleteBookStatus,setDeleteBookStatus]=useState(false)
const [purchaseBooks,setPurchaseBooks]=useState([])
const [username,setUsername]=useState("")
const [userDp,setUserDp]=useState("")
const {userEditResponse}=useContext(userUpdateContext)

useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
    const user= JSON.parse(sessionStorage.getItem("user"))
    setUsername(user.username)
    setUserDp(user.profile)
  }
},[userEditResponse])


const handleReset =()=>{
  setBookDetails({
    title: "",
    author: "",
    noOfPages: "",
    imageUrl: "",
    price: "",
    discountPrice: "",
    abstract: "",
    publisher: "",
    language: "",
    isbn: "",
    category: "",
    uploadImg: []
  })
  setPreview("")
  setPreviewList([])
}

// function for submiting book

const handleBookSubmit =async()=>{
  const {title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg}=bookDetails
  if(!title || !author || !noOfPages || !imageUrl || !price || !discountPrice || !abstract || !publisher || !language || !isbn || !category || uploadImg.length==0){
    toast.info("Please fill the form completely !!!")
  }else{
    //api call
    const reqHeader ={
      "Authorization": `Bearer ${token}`
    }
    const reqBody = new FormData()
    // append : reqBody.append(key,value)
    for(let key in bookDetails){
      if(key != "uploadImg"){
         reqBody.append(key,bookDetails[key])
      }else{
        bookDetails.uploadImg.forEach(img =>{
          reqBody.append("uploadImg",img)
        })
      }
    }
    try{
      const result = await addBookAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status == 401){
        toast.warning(result.response.data)
        // clear all field
        handleReset()
      }else if(result.status==200){
        toast.success("Book added successfully !!!")
        //clear all field
        handleReset()
      }else{
        toast.error("Something went wrong !!!")
        // clear all field
        handleReset()
      }
    }catch(err){
      console.log(err);
      
    }
  }
}

useEffect(()=>{
  if(bookStatus==true){
    getAllUserBooks()
  }else if(purchaseStatus==true){
    getAllUserBoughtBooks()
  }
},[bookStatus,deleteBookStatus,purchaseStatus])

const getAllUserBooks=async()=>{
   const reqHeader ={
      "Authorization": `Bearer ${token}`
    }
    try{
      const result=await getAllUserUploadBooksAPI(reqHeader)
      if(result.status==200){
        setUserBooks(result.data)
      }else{
        console.log(result);
        
      }
    }catch(err){
      console.log(err);
      
    }
}

const removeBook=async(bookId)=>{
  const reqHeader={
    "Authorization":`Bearer ${token}`
  }
  try{
    const result= await removeUserUploadBookAPI(bookId,reqHeader)
    if(result.status==200){
      toast.success(result.data)
      setDeleteBookStatus(true)
    }else{
      console.log(result);
    }
  }catch(err){
    console.log(err);
    
  }
}

const getAllUserBoughtBooks = async()=>{
  const reqHeader={
    "Authorization":`Bearer ${token}`
  }
  try{
    const result= await getAllUserPurchasedBooksAPI(reqHeader)
    if(result.status==200){
      setPurchaseBooks(result.data)
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
      <div style={{height:'200px'}} className='bg-black'></div>

        <div style={{height:'230px',width:"230px",borderRadius:"50%",marginTop:'-130px',marginLeft:'70px'}} className='bg-white p-3'>
          <img style={{height:'200px',width:"200px",borderRadius:"50%"}} src={userDp==""?"/usericon.png":userDp.startsWith("https://lh3.googleusercontent.com/")?userDp:`${SERVERURL}/uploads/${userDp}`} alt="profile" />
        </div>
        <div className='md:flex justify-between px-20 mt-5'>
          <div className='flex items-center'>
            <h1 className='font-bold md:text-3xl text-2xl'>{username}</h1>
            <FontAwesomeIcon className='text-blue-400 mx-3' icon={faCircleCheck} />

          </div>
          <Edit/>
        </div>

        <p className='md:px-20 px-5 my-5 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus ea, illo ipsa non porro consectetur minus, ratione exercitationem alias et assumenda voluptatibus inventore voluptatum beatae distinctio corrupti optio corporis obcaecati.</p>
        <div className='md:px-40'>
          {/* tabs */}
          <div className='flex justify-center items-center my-5'>
            <p onClick={()=>{setSellBookStatus(true);setPurchaseStatus(false);setBookStatus(false)}} className={sellBookStatus?'text-blue-500 p-4 border-gray-400 border-t border-l border-r rounded cursor-pointer':'p-4 border-b border-gray-200 cursor-pointer'} >Sell Books</p>
            <p onClick={()=>{setBookStatus(true);setPurchaseStatus(false);setSellBookStatus(false)}} className={bookStatus?'text-blue-500 p-4 border-gray-400 border-t border-l border-r rounded cursor-pointer':'p-4 border-b border-gray-200 cursor-pointer'} >Book Status</p>
            <p onClick={()=>{setPurchaseStatus(true);setBookStatus(false);setSellBookStatus(false)}} className={purchaseStatus?'text-blue-500 p-4 border-gray-400 border-t border-l border-r rounded cursor-pointer':'p-4 border-b border-gray-200 cursor-pointer'} >Purchase History</p>
          </div>

          {/* contents */}
          {/* sell books */}
          
          {
            sellBookStatus &&
            <div>
              <div className='p-10 my-20 mx-5 bg-gray-200'>
                <div className='text-center text-3xl'>Book Details</div>
                <div className='md:grid grid-cols-2 mt-10 w-full'>
                 <div className='px-3'>
                    <div className='mb-3 px-3'>
                      <input value={bookDetails.title} onChange={e=>setBookDetails({...bookDetails,title:e.target.value})} type="text" placeholder='Title' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                    
                    </div>
                     <div className='mb-3 px-3'>
                      <input value={bookDetails.author} onChange={e=>setBookDetails({...bookDetails,author:e.target.value})} type="text" placeholder='Author' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                    
                    </div>
                    <div className='mb-3 px-3'>
                      <input value={bookDetails.noOfPages} onChange={e=>setBookDetails({...bookDetails,noOfPages:e.target.value})} type="text" placeholder='No of pages' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                    
                    </div>
                    <div className='mb-3 px-3'>
                      <input value={bookDetails.imageUrl} onChange={e=>setBookDetails({...bookDetails,imageUrl:e.target.value})} type="text" placeholder='Image URL' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                    
                    </div>
                    <div className='mb-3 px-3'>
                      <input value={bookDetails.price} onChange={e=>setBookDetails({...bookDetails,price:e.target.value})} type="text" placeholder='Price' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                    
                    </div>
                    <div className='mb-3 px-3'>
                      <input value={bookDetails.discountPrice} onChange={e=>setBookDetails({...bookDetails,discountPrice:e.target.value})} type="text" placeholder='Discount Price' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                    
                    </div>
                    <div className='mb-3 px-3'>
                      <textarea value={bookDetails.abstract} onChange={e=>setBookDetails({...bookDetails,abstract:e.target.value})}placeholder='Abstract' name="" id="" rows={4} className='w-full p-2 rounded placeholder-gray-400 text-black bg-white'></textarea>

                    </div>
                 </div>

                 <div className='px-3'>
                  <div className='mb-3 px-3'>
                      <input value={bookDetails.publisher} onChange={e=>setBookDetails({...bookDetails,publisher:e.target.value})} type="text" placeholder='Publisher' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                    
                    </div>
                    <div className='mb-3 px-3'>
                      <input value={bookDetails.language} onChange={e=>setBookDetails({...bookDetails,language:e.target.value})} type="text" placeholder='Language' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                    
                    </div>
                    <div className='mb-3 px-3'>
                      <input value={bookDetails.isbn} onChange={e=>setBookDetails({...bookDetails,isbn:e.target.value})} type="text" placeholder='ISBN' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                    
                    </div>
                    <div className='mb-3 px-3'>
                      <input value={bookDetails.category} onChange={e=>setBookDetails({...bookDetails,category:e.target.value})} type="text" placeholder='Category' className='w-full p-2 rounded placeholder-gray-400 text-black bg-white' />
                    
                    </div>

                    <div className='mb-3 flex justify-center items-center mt-10'>
                      <label htmlFor="bookImage">
                        <input onChange={e=>handleUploadBookImage(e)} type="file" id='bookImage' className='hidden' />
                    { 
                      !preview ? 
                      <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_640.png" height={'200px'} width={'200px'} alt="bookImage" />
                      :
                      <img src={preview} width={'200px'} height={'200px'} alt='book'></img>
                    }
                      </label>

                    </div>

                    {preview &&
                      <div className=' flex justify-center items-center'>
                        {
                          previewList?.map(imageUrl=>(
                            <img className='mx-3' src={imageUrl} width={'70px'} height={'70px'} alt='book'/>
                          ))
                        }
                        {
                          previewList.length<3 &&
                      <label htmlFor="bookImage">
                        <input onChange={e=>handleUploadBookImage(e)} type="file" id='bookImage' className='hidden' />
                        <FontAwesomeIcon icon= {faSquarePlus} className='fa-2x shadow ms-3 text-gray-500'/>
                      </label>}

                    </div>
                    }
                 </div>
                   
                </div>
                {/* modal footer */}
              <div className='text-end bg-gray-200  p-3'>
                <button onClick={handleReset} className='bg-yellow-400 text-white rounded p-2 px-5 mx-5 hover:bg-yellow-600 hover:text-black'>Reset</button>
                <button onClick={handleBookSubmit} className='bg-green-600 text-white rounded p-2 px-5 hover:bg-green-700 hover:text-black'>Submit</button>
              </div>

              </div>
            </div>
          }

          {/* book status */}

          {
            bookStatus &&
            <div className='p-10 my-20 shadow-lg rounded'>
              {/* duplicate div according to book */}
              {
                userBooks?.length ?
                userBooks?.map((item,index)=>(
                  <div key={index} className='p-5 rounded mt-4 bg-gray-200'>
                <div className='md:grid grid-cols-[3fr_1fr]'>
                  <div className='px-4'>
                    <h1 className='text-2xl '>{item?.title}</h1>
                    <h2 className='text-xl'>{item?.author}</h2>
                    <h3 className='text--lg text-blue-500'>${item?.discountPrice}</h3>
                    <p className='text-justify'>{item?.abstract}</p>
                    <div className='flex mt-3'>
                      {
                        item?.status=="pending"?
                        <img height={'150px'} width={'200px'} src="https://psdstamps.com/wp-content/uploads/2022/04/pending-stamp-png.png" alt="approved icon" />: item?.status=="pending icon"?
                        <img height={'150px'} width={'150px'} src="https://png.pngtree.com/png-clipart/20230328/original/pngtree-approved-vector-black-stamp-approved-icon-png-image_9006494.png" alt="approved icon" />:
                        <img height={'150px'} width={'150px'} src="https://static.vecteezy.com/system/resources/previews/019/787/028/non_2x/sold-icon-on-transparent-background-free-png.png" alt="sold icon" />
                      }
                    </div>

                  </div>
                  <div className='px-4 mt-4 md:mt-0'>
                    <img className=" w-full " src={item?.imageUrl} alt="alchemist" />
                    <div className='mt-4 flex justify-end'>
                      <button onClick={()=>removeBook(item?._id)} className='bg-red-400 text-white rounded p-2 px-5 mx-5 hover:bg-red-600 hover:text-black'>Delete</button>

                    </div>
                   

                  </div>

                </div>

              </div>
                ))
                :
                <div className='flex justify-center items-center flex-col'>
                <img width={'25%'} src="https://cdn.edu.buncee.com/rackspace/bnc-assets/animations/466/1435256424-Young_animation_education062515_01.gif" alt="book" />
                <p className='font-bold text-xl'>Books haven't been uploaded yet.</p>
              </div>
              }

            </div>
          }

          {/* purchase history */}
          {
           purchaseStatus &&
           <div className='p-10 my-20 shadow-lg rounded'>
              {/* duplicate div according to book */}
             {
              purchaseBooks?.length>0?
              purchaseBooks?.map((item,index)=>(
                 <div key={index} className='p-5 rounded mt-4 bg-gray-200'>
                <div className='md:grid grid-cols-[3fr_1fr]'>
                  <div className='px-4'>
                    <h1 className='text-2xl '>{item?.title}</h1>
                    <h2 className='text-xl'>{item?.author}</h2>
                    <h3 className='text--lg text-blue-500'>$ {item?.discountPrice}</h3>
                    <p className='text-justify'>{item?.abstract}</p>
                    <div className='flex mt-3'>
                      <img height={'150px'} width={'200px'} src="https://www.pngplay.com/wp-content/uploads/6/Sold-Out-Stamp-PNG.png" alt="" />
                     
                    </div>

                  </div>
                  <div className='px-4 mt-4 md:mt-0'>
                    <img className=" w-full " src={item?.imageUrl}/>
                  </div>

                </div>

              </div>
              ))
              :
              <div className='flex justify-center items-center flex-col'>
                <img width={'25%'} src="https://cdn.edu.buncee.com/rackspace/bnc-assets/animations/466/1435256424-Young_animation_education062515_01.gif" alt="book" />
                <p className='font-bold text-xl'>Books haven't been purchased yet.</p>
              </div>
             }

            </div>

          }

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
    </>
  )
}

export default Profile