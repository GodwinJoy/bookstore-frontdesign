import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './users/pages/Home'
import Preloader from './components/Preloader'
import Auth from './pages/Auth'
import AllBooks from './users/pages/AllBooks'
import ViewBook from './users/pages/ViewBook'
import Profile from './users/pages/Profile'
import Contact from './users/pages/Contact'
import Careers from './users/pages/Careers'
import Dashboard from './admin/pages/Dashboard'
import CareerAdmin from './admin/pages/CareerAdmin'
import ResourceAdmin from './admin/pages/ResourceAdmin'
import SettingAdmin from './admin/pages/SettingAdmin'
import Pnf from './pages/Pnf'
import { userAuthContext } from './contextAPI/AuthContext'
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentError from './users/pages/PaymentError'

function App() {
  const {role,authorisedUser,setAuthorisedUser}=useContext(userAuthContext)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },7000);
  },[])

  return (
    <>
    <Routes>
      <Route path='/' element={loading?<Preloader/> :<Home/>} />
      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth register/>} />
      <Route path='/all-books' element={<AllBooks/>}/>
      <Route path='/careers' element={<Careers/>} />
      <Route path='/contact' element={<Contact/>} />

      
       {
        role=="user" &&
        <>
          <Route path='/books/:id/view' element={<ViewBook/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/payment-success' element={<PaymentSuccess/>}/>
          <Route path='/payment-error' element={<PaymentError/>}/>
        </>
        }
       
      

     {
     role=="admin" && 
     <>
        <Route path='/admin-dashboard' element={loading?<Preloader/>:<Dashboard></Dashboard>}/>
        <Route path='/admin-resources' element={<ResourceAdmin/>}/>
        <Route path='/admin-careers' element={<CareerAdmin/>}/>
        <Route path='/admin-settings' element=
       {<SettingAdmin/>}/>
     </>
      }

      <Route path='/*' element={<Pnf/>}/>
    </Routes>

    </>
  )
}

export default App
