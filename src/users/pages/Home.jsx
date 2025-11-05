import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { Link, useNavigate } from 'react-router-dom'
import { getHomeBooksAPI } from '../../services/allAPI'
import { ToastContainer,toast } from 'react-toastify'
import { searchBookContext } from '../../contextAPI/ContextShare'


const Home = () => {
  const [homeBooks,setHomeBooks]=useState([])
  const navigate=useNavigate()
  const {searchKey,setSearchKey}=useContext(searchBookContext)
  useEffect(()=>{
    setSearchKey("")
    getHomeBooks()
  },[])
  // console.log(homeBooks);

  const searchBook=()=>{
    if(!searchKey){
      toast.warning("Please provide a book title here...")
    }else if(!sessionStorage.getItem("token")){
      toast.warning("Please login to search books...")
      setTimeout(()=>{
        navigate("/login")
      },2500)
    }else if(sessionStorage.getItem("token")&& searchKey){
      navigate("all-books")
      
    }
    else{
      toast.error("Something went wrong!!!")
    }
  }
  
  const getHomeBooks =async ()=>{
    try{
      const result=await getHomeBooksAPI()
      if(result.status==200){
        setHomeBooks(result.data)
      }

    }catch(err){
      console.log(err);
      
    }
  }
  return (
    <>
      <Header/>
      {/* landing */}
      <div style={{height:'500px'}} className="flex flex-col justify-center items-center  bg-[url('/landing.jpg')] bg-cover bg-center text-white">
      <div style={{height:'500px', backgroundColor:'rgba(0,0,0,0.5'}} className='w-full flex flex-col justify-center items-center'>
        <h1 className='text-5xl font-bold'>Wonderful Gifts</h1>
        <p>Give your damily and friends a book.</p>
        <div className='my-5'>
          <input type="text" className='rounded-l-lg bg-gray-100 px-25 py-2  placeholder-gray-700 text-black' placeholder='Search Books'  onChange={(e) => setSearchKey(e.target.value)}/>
          <button className='rounded-r-lg bg-white text-blue-600 py-2 px-4 cursor-pointer'><FontAwesomeIcon  onClick={searchBook} icon={faMagnifyingGlass} /></button>
      </div>
      </div>
      </div>
      
      {/* arrival */}
      <section className='md:px-40 p-5 flex flex-col justify-center items-center ' >
        <h1 className='text-center mt-20 text-2xl font-bold'>NEW ARRIVALS</h1>
        <h2 className='text-center text-2xl mt-5'>Explore Our Latest Collection</h2>
  
        <div className='md:grid grid-cols-4 w-full my-5'>
         {
          homeBooks.length>0?
          homeBooks?.map((book,index)=>(
             <div key={index} className="shadow rounded p-3 mx-4">
            <img width={"100%"} height={"300px"} src={book?.imageUrl} alt="book" />
            <div className="flex flex-col justify-center items-center mt-4">
              <h5 className="mb-2 pt-2 text-blue-700 text-lg">{book?.author}</h5>
              <h5>{book?.title}</h5>
              <h5>{book?.discountPrice}</h5>
            </div>
          </div>
          ))
          :
          <p>Loading...</p>
         }
  
        </div>
        <div className='flex justify-center items-center'>
          <Link to={'/all-books'}><button className='bg-blue-700 p-2 text-white cursor-pointer rounded mx-auto'>EXPLORE MORE</button></Link>
        </div>
      </section>

      {/* author */}
      <section className='md:grid grid-cols-2 my-20 gap-9 md:mx-20 px-20'>
        <div className='text-justify'>
          <h1 className='text-center text-xl font-bold'>Featured Authors</h1>
          <h1 className='text-center font-bold'>Captivates with every word</h1>
          <p className='mt-20 font-bold'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, neque nam? Veniam iusto, ea necessitatibus ipsa aliquid veritatis, magnam explicabo aspernatur doloremque ipsam aut! Odio modi est itaque delectus quo.
          Dolore accusamus adipisci impedit, exercitationem porro hic voluptas enim ut, omnis debitis architecto necessitatibus? Excepturi nobis labore vitae, magnam quas recusandae nostrum voluptas voluptatibus ad sed consequuntur et quos delectus?</p>
          <br />
          <p className='font-bold'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus maiores deserunt commodi dolor eos, aliquid dicta itaque neque dolorem voluptates minus asperiores pariatur minima quod ratione dolorum ab a ipsa.
          Alias quibusdam praesentium dicta cumque impedit deserunt nostrum quo, sit quaerat, quos doloremque omnis adipisci, harum ipsum labore perferendis veritatis laboriosam odit reiciendis officia optio quasi debitis eaque eveniet? Eos.</p>
        </div>
        <div>
          <img className='
          my-5 ' src="/author.png" alt="authorphoto" />
        </div>

      </section>

      {/* testimony */}

      <section className='text-center mx-20'>
        <h1 className='font-bold text-2xl'>TESTIMONIALS</h1>
        <h3 className='text-xl mb-5'>See what others are saying</h3>
        <img className='mx-auto mb-2' height={'20px'} width={'100px'} src="/usericon.png"  alt="" />
        <h3 className='font-bold mb-5'>Treesa Joseph</h3>
        <p className='font-bold  text-justify px-10'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi autem harum in quos! Molestiae blanditiis quam deleniti illum? Et quod amet sint corrupti excepturi aspernatur ad consequatur eaque eveniet provident! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur eaque minus quo aut ea, fugiat repellat cupiditate tempora facilis nobis.</p>
      </section>

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

export default Home