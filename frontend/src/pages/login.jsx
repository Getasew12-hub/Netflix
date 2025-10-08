import React, { useEffect, useState } from 'react'
import classes from "./auth.module.css";
import Input from "../controller/input";
import {Link} from 'react-router-dom'
import userStore from "../store/userStore"
import { Loader } from 'lucide-react';

function Login() {
  const {loadding,Loginuser,error}=userStore();
  const [errorState,setError]=useState(error)
  const [formval,setForm]=useState({
    email:'',
    password:'',
   
  })
 
 useEffect(()=>{
    setError(error)
  },[error])

  
  function formInput(e){
    const {name,value}=e.target;
 
  
setError({error:null})
    setForm((pre)=>{
      return{
        ...pre,
        [name]:value,
      }
    })
  }


  function formSend(e){
    e.preventDefault();
    Loginuser(formval)
  }
  return (
    <div  className='hero-bg' >
      <header className={classes.header}>
        <Link to='/'><div className={classes.img}>
        <img src="./netflix-logo.png" alt="" />
        </div></Link>
      </header>

      <div className={classes.form}>
        <h1>Login</h1>
   <div>
        <form onSubmit={formSend}>
          <Input type='email' required placeholder='you@email.com' name='email' lable='Email' lablename='email' value={formval.email} onChange={formInput}/>
       
         
          <Input type='password' required placeholder='*******' name='password' lable='Password' lablename='password' value={formval.password} onChange={formInput}/>

               {errorState.error &&  <p style={{color:'red',marginTop:'5px'}}>{errorState.error}</p>}
          <button type="submit" >{loadding ? <Loader className='load'/> : "Login"}</button>
        </form>
        <div style={{textAlign:'center',marginTop:'15px'}}>
           Don't have an account?{" "}
          <Link to='/signup' style={{color:'red'}}>Sing up</Link>
        </div>

   </div>     
      </div>

    </div>
  )
}

export default Login