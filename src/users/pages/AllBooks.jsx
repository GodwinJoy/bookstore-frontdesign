import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer,toast } from 'react-toastify'
import { getAllBooksAPI } from '../../services/allAPI'
import { searchBookContext } from '../../contextAPI/ContextShare'


const AllBooks = () => {
  const[listStatus,setListStatus]=useState(false)
  const [token,setToken]=useState("")
  const[books,setBooks]=useState([])
  const [tempBooks,setTempBooks]=useState([])
  const [allCategories,setAllCategories]=useState([])
  const {searchKey,setSearchKey}=useContext(searchBookContext)
  // console.log(books);
  

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      const userToken=sessionStorage.getItem("token")
      setToken(userToken)
      getAllBooks(userToken)
    }
  },[searchKey])

  const getAllBooks=async (userToken)=>{
    const reqHeader={
      "Authorization":`Bearer ${userToken}`
    }
    try{
      const result= await getAllBooksAPI(searchKey,reqHeader)
      if(result.status==200){
        setBooks(result.data)
        setTempBooks(result.data)
        const tempCategory =result.data.map(item=>item.category)
        // console.log(tempCategory);
        const tempArray=[...new Set(tempCategory)]
        // console.log(tempArray);
        setAllCategories(tempArray)
      }else{
        console.log(result);
        toast.warning(result.response.data)
      }
    }catch(err){
      console.log(err);
      
    }

  }

// filtering books according to category
const filterBooks=(category)=>{
  if(category=="No-Filter"){
    setBooks(tempBooks)
  }else{
    setBooks(tempBooks?.filter(item=>item.category.toLowerCase()==category.toLowerCase()))
  }
}


  return (
    <> 
    <Header/>
   { 
   token?
    <>
    <div className='flex justify-center items-center flex-col my-5'>
      <h1 className='text-3xl font-bold'>Collections</h1>
     <div className='flex my-3'>
        <input value={searchKey} onChange={e=>setSearchKey(e.target.value)} type="text" className='p-2 border border-gray-500 text-black w-100 placeholder-gray-600' placeholder='Search by title' />
        <button className='bg-blue-900 text-white p-2'>Search</button>
     </div>
    </div>


    {/*filter grid */}
    <div className='md:grid grid-cols-4 md:px-20 p-5'>
      
      <div className='col-span-1 my-10'>
       <div className='flex justify-between'>
          <h1 className='text-2xl font-semibold'>Filters</h1>
          <button onClick={()=>setListStatus(!listStatus)} className='text-2xl md:hidden'><FontAwesomeIcon icon={faBars} /></button>
       </div>
        <div className={listStatus?'block':'md:block hidden'}>
         {
          allCategories?.length>0 &&
          allCategories?.map((category,index)=>(
            <div key={index} className='mt-3'>
            <input type="radio" id={category} name='filter' onClick={()=>filterBooks(category)}/>
            <label className='ms-3' htmlFor={category}>{category}</label>
          </div>
          ))
         }
          <div className='mt-3'>
            <input type="radio" id='No-Filter' name='filter' onClick={()=>filterBooks("No-Filter")}/>
            <label className='ms-3' htmlFor="No-Filter">No-Filter</label>
          </div>
        </div>
      </div>

      {/* books */}
      <div className='col-span-3'>
        <div className='md:grid grid-cols-4 gap-10' >
            {
              books.length>0?
              books.map(book=>(
              <div key={book?._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg  mb-10" hidden={book?.status=="pending" || book?.status=="sold"}>
            <img className="p-2 " src={book?.imageUrl} alt="book" />
          <div className="flex flex-col justify-center items-center">
              <h5 className="mb-2 pt-2 text-blue-700">{book?.author.slice(0,20)}</h5>
              <h5>{book?.title.slice(0,20)}</h5>
              <Link to={`/books/${book?._id}/view`} className='bg-blue-700 p-2 text-white my-2 rounded'>View Book</Link>
            </div>
          </div>
              ))

              :
              <p>No Books</p>
            }
             
        </div>

      </div>

    </div>
    </>
    :
    
      <div className='my-10 flex justify-center items-center flex-col'>
        <img className='w-75' src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/JCzKThXsSJ.gif" alt="lock" />
        <p className='font-semibold text-xl mt-6'>Please <Link to={'/login'} className='text-blue-700 font-bold underline'>Login..</Link>to explore more...</p>
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

export default AllBooks