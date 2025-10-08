import React, { useEffect, useState } from 'react'
import classes from "./auth.module.css";
import Input from "../controller/input";
import {Link, useParams} from 'react-router-dom'
import userStore from "../store/userStore"
import {Loader} from "lucide-react"
function signup() {
  const {loadding,SignUp,error}=userStore();
  const [errorState,setError]=useState(error)

    const {searchParams}=new URL(document.location);
    const email=searchParams.get('email')
  
  const [formval,setForm]=useState({
    email:email ||  '',
    password:'',
    username:''
  })
 
 useEffect(()=>{
    setError(error)
  },[error])

  
  function formInput(e){
    const {name,value}=e.target;
 
  
setError((pre)=>{

  return{
    ...pre,
    [name]:null,
  }
})
    setForm((pre)=>{
      return{
        ...pre,
        [name]:value,
      }
    })
  }


  function formSend(e){
    e.preventDefault();
    SignUp(formval)
  }
  return (
    <div  className='hero-bg' >
      <header className={classes.header}>
        <Link to='/'><div className={classes.img}>
        <img src="./netflix-logo.png" alt="" />
        </div></Link>
      </header>

      <div className={classes.form}>
        <h1>Sing Up</h1>
   <div>
        <form onSubmit={formSend}>
          <Input type='email' required placeholder='you@email.com' name='email' lable='Email' lablename='email' value={formval.email} onChange={formInput}/>
        {errorState.email &&  <p style={{color:'red' ,marginTop:'5px'}}>{errorState.email}</p>}
          <Input type='text' required placeholder='joindo' name='username' lable='Username' lablename='username' value={formval.username} onChange={formInput}/>
          {errorState.username &&  <p style={{color:'red',marginTop:'5px'}}>{errorState.username}</p>}
          <Input type='password' required placeholder='*******' name='password' lable='Password' lablename='password' value={formval.password} onChange={formInput}/>
               {errorState.password &&  <p style={{color:'red',marginTop:'5px'}}>{errorState.password}</p>}
          <button type="submit" >{loadding ? <Loader className='load'/> : "Sign up"}</button>
        </form>
        <div style={{textAlign:'center',marginTop:'15px'}}>
          I already a member?{" "}
          <Link to='/login' style={{color:'red'}}>Login</Link>
        </div>

   </div>     
      </div>

    </div>
  )
}

export default signup