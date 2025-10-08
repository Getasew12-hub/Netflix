import React, { useEffect, useState } from 'react'
import  classess from "./navbar.module.css"
import { Link } from 'react-router-dom'
import { LogOut, Menu, Search } from 'lucide-react'
import userStore from '../store/userStore'
import movieTvStore from '../store/movieTvStore'

function Navbar({click}) {
    const {Logout}=userStore()
    const {getBanner,ChangeContentType}=movieTvStore();
     const [showMObileVer,setshows]=useState(innerWidth);
     const [moblieVisiblity,setMoblie]=useState(false)
   
     useEffect(()=>{
        const Size=()=>{
            setshows(innerWidth);
        }
        window.addEventListener('resize',Size)

        return ()=>removeEventListener('resize',Size);
     },[])

 

  
    function avaterimage(){
      
      return "/avatar"+1+'.png';
    }
    const image=avaterimage()


  return (
          <header>
           
            <div className={classess.component}>
        <div className={classess.homeleft}>
          <Link to={"/"}><img src={ "/netflix-logo.png"} alt="netflix logo"  /></Link>
   {showMObileVer>700 &&  <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
          <Link to={"/"} onClick={()=>{ChangeContentType('movies')}}>Movies</Link>
          <Link to={"/"} onClick={()=>{ChangeContentType('tv')}}>TV Shows</Link>
          <Link to={"/history"}>Search history</Link>

     </div>    } 
        </div>
        <div className={classess.homeright}>

          
        <Link to={"/search"} ><Search size={showMObileVer<=500 ? 19 : 24}/></Link> 
          <img src={image} alt="" />
          <LogOut onClick={Logout} size={showMObileVer<=500 ? 19 : 24}/>
        {showMObileVer<=700 &&   <Menu onClick={()=>setMoblie(!moblieVisiblity)} size={showMObileVer<=500 ? 20 : 25}/>}
        </div>
  </div>
        {/* mobile show */}
        
      {showMObileVer<=700 && moblieVisiblity &&   <div className={classess.mobileshow}>
             <Link to={"/"}  onClick={()=>{ChangeContentType('movies')}}>Movies</Link>
          <Link to={"/"} onClick={()=>{ChangeContentType('tv')}}>TV Shows</Link>
          <Link to={"/history"}>Search history</Link>
        </div>}
      </header>
  )
}

export default Navbar