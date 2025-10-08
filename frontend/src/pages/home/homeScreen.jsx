import React, { useEffect, useState } from 'react'
import userStore from '../../store/userStore'
import { Link } from 'react-router-dom'

import classess from "./home.module.css";
import Navbar from '../../controller/Navbar';
import { Flag, Info, Loader, Play } from 'lucide-react';
import movieTvStore from '../../store/movieTvStore';
import { utilitis } from '../../utlitis/utiliti';
import Contents from '../../controller/Contents';
import {MovieCatagory,Tvcatagory } from '../../utlitis/utiliti';

function homeScreen() {

 const {banner,loadding,getBanner,contentType,content}= movieTvStore()
 const [click,setclick]=useState(false)

 const [imageLoad,setiMageLoad]=useState(true)
useEffect(()=>{
  
  
  
  getBanner()
  setTimeout(() => {
     setclick(false)
  }, 0);
 
},[contentType])


if(loadding) return <div style={{height:'100vh',background:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
  <Loader  className='loader' size={45} />
  </div>




  return (
    <>
    <div className={classess.header}>

    <Navbar  click={setclick}/>
    {imageLoad && <div className='shimmereffect'> </div> }
    <img src={utilitis.ORGINAL_IMG+banner?.backdrop_path || "./extraction.jpg"} alt="hero image" className={classess.headerimg} onLoad={()=> setiMageLoad(false)}/>

    <div className={classess.shadowbackgorund}/>

    <div className={classess.backgroutop}>

      <div className={classess.headeritem}>
      <h1>{banner?.title || banner?.name}</h1>
      <p>{banner?.release_date?.split('-')[0] || banner?.first_air_date?.split('-')[0]}| {!banner?.adult ? "+18" : "PG-13" } </p>
      <p style={{marginTop:'15px',maxWidth:'550px'}}>{banner?.overview.length>200 ? banner.overview?.slice(0,200)+' ...' : banner?.overview}</p>

      <div  className={classess.buttons}>
        <Link to={`/watch/${banner?.id}`} style={{background:'white',color:'black'}}>
        <Play/>
        Play
        </Link>
        <Link to={`/watch/${banner?.id}`} style={{background:'gray',color:'black'}}>
        <Info/>
        More info
        Play
        </Link>
      </div>
    </div>
    </div>
    </div>

    {/* content */}
    <div className={classess.nowplaying}>
     
     {contentType=='movies' ? MovieCatagory.map((val)=> <Contents key={val} catagory={val}/>)  :Tvcatagory.map((val)=> <Contents key={val} catagory={val}/>) } 
    </div>
    </>
  )
}

export default homeScreen

