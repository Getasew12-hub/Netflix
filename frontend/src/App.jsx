import React, { useEffect } from 'react'
import {Routes,Route, Navigate} from "react-router-dom"
import Home from "./pages/home/home"
import Signup from "./pages/signup"
import Login from "./pages/login"
import {Toaster} from 'react-hot-toast'
import Footer from './controller/Footer'
import userStore from './store/userStore'
import { Loader } from 'lucide-react'

import WatchPage from './pages/WatchPage'
import Search from "./pages/Search"
import SearchHistory from './pages/SearchHistory'

function App() {
  const {user,AuthCheck,checkAuth}=userStore()

 useEffect(()=>{
  AuthCheck()
 },[AuthCheck])
  if(checkAuth) return <div style={{height:'100vh',background:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
  <Loader  className='loader' size={45} />
  </div>
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={user ? <Navigate to={"/"}/> :<Signup/>}/>
        <Route path='/login' element={user ? <Navigate to={"/"}/> :<Login/>}/>
        <Route path='/search' element={user ? <Search/> : <Navigate to={"/login"}/>}/>
        <Route path='/history' element={user ? <SearchHistory/> : <Navigate to={"/login"}/>}/>
        <Route path='/watch/:id' element={user ? <WatchPage/> : <Navigate to={"/login"}/>}/>
      </Routes>
  <Footer/>
      <Toaster/>
    </div>
  )
}

export default App