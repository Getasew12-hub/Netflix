import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classess from "./homeauth.module.css"
import { ChevronRight }  from "lucide-react"
import userStore from '../../store/userStore'
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast'


function authScreen() {
  const navigate=useNavigate();
  
  const [emailfill,setemailfill]=useState('')

  function Emailhandler(e){
    e.preventDefault()
   
     navigate("/signup?email="+emailfill)
    
  }
  return (
   <div style={{background:'black'}}>
    <div className='hero-bg' style={{position:'relative'}}>
      <header className={classess.header}>
        <Link to='/'><div className={classess.netflix}>
        <img src="/netflix-logo.png" alt="" />
        </div></Link>

    <Link to={"/signup"}>   <button>Sing up</button></Link> 
      </header>


      <div className={classess.hadersection}>
        <h1>Unlimited movies,TV shows,and more</h1>
        <p>Watch anywhere. Cancel anytime.</p>
        

        <div className={classess.form}>
          <p>Ready to watch? Enter your email to create or restart you membership</p>
          <form onSubmit={Emailhandler}>
          <input type="text" placeholder='Emial address' name='email' style={{color:'white'}} onChange={(e)=>setemailfill(e.target.value)} />
          <button  >Get  Started <ChevronRight /></button>
          </form>
        </div>
      </div>

       <div className={classess.separetor} />
    </div>

    <div className={classess.tvshow}>
  <div className={classess.left}>
    <h1 style={{marginBottom:'15px'}}>Enjoy on your TV</h1>
    <p>Watch on smart TV,Playstaions,Xbox,Chromcast,Apple TV,Blu-ray players,and more</p>
  </div>
  <div className={classess.right}>
     
      <img src="./tv.png" alt=""  />
    <video  className={classess.video} playsInline autoPlay={true} muted loop>
     <source src='./hero-vid.mp4' type='video/mp4'/>
    
    </video>
    </div>

    
    </div>
  <div className={classess.separetorother} />


  <div className={classess.download}>

    <div className={classess.left}>
   <img src="./stranger-things-lg.png" alt="strenger things" />

   <div className={classess.downloaditem}>
   <div className={classess.smallimg}>
    
    <img src="./stranger-things-sm.png" alt="strenger things" />
   </div>

   <div>
    <p>Strenger Things</p>
    <p style={{color:'dodgerblue'}}>Downloading...</p>
   </div>

   <img src="./download-icon.gif" alt="" />

</div>
    </div>
    <div className={classess.right}>
   <h1>Download your shows to watch offline</h1>

   <p style={{marginTop:'10px'}}>Save your favorites easily and always have something to watch.</p>
    </div>

  </div>

    <div className={classess.separetorother} />

        <div className={classess.tvshow}>
  <div className={classess.left}>
    <h1 style={{marginBottom:'15px'}}>Watch everywhere</h1>
    <p>Stream unlimited movies and TV shows on your phone,tablet,laptop,TV.</p>
  </div>
  <div className={classess.right}>
     
      <img src="./device-pile.png" alt=""  />
     <video style={{position:'absolute',top:'31%',left:'50%',transform:'translate(-50%,-50%)',width:'57%'}} autoPlay muted playsInline loop>
    <source  src='./video-devices.mp4' type='video/mp4'/>
  </video>
    </div>
  
    
    </div>

    <div className={classess.separetorother} />


  <div className={classess.download}>

    <div className={classess.left}>
   <img src="./kids.png" alt="kids" />
    </div>
    <div className={classess.right}>
   <h1>Create  profiles for kids</h1>

   <p style={{marginTop:'10px'}}>Send kids on adventures with their favorite characters in a space made just for them-free with your membership.</p>
    </div>

  </div>

    </div>
  )
}

export default authScreen