import React, { useEffect, useRef, useState } from 'react'
import axios from "../middleware/axios"
import movieTvStore from '../store/movieTvStore'
import classess from "./content.module.css"
import{ ChevronLeft, ChevronRight  } from "lucide-react"
import { utilitis } from '../utlitis/utiliti'
import { Link } from 'react-router-dom'

function NowPlaying({catagory}) {
const {Contents,contentLoad,contentType,FeatchContent}=movieTvStore()


 let title=catagory.replace("_",' ').charAt(0).toUpperCase()+catagory.replace("_",' ').slice(1)
 title=title+" "+(contentType=='movies' ? 'Movies' :'TV shows');


const sliderRef=useRef()
    const [loadding,setLoadding]=useState(true)
    const [imageLoad,setImagLoad]=useState(true)
   const [content,setContent]=useState([])

   
 const {TUMBNAL_IMG}=utilitis;
    useEffect(()=>{
   async function getCatagry(){
    await  FeatchContent(catagory);
         setLoadding(false)
    }
    getCatagry()
    },[])


  

function forward(){
    if(sliderRef.current){
      sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth,behavior: "smooth"})
    }

}

function backward(){
   if(sliderRef.current){
      sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth,behavior: "smooth"})
    }

     
}


  


 
  return (
    <div   className={classess.main}>
     
     <h2  className={classess.title}>{title}</h2>
   <div className={classess.contents} ref={sliderRef}>
    
    {!loadding ? (Contents[catagory]?.map((val)=>
    <div key={val.id} className={classess.contentitem}>
    <Link to={`/watch/${val.id}`}>  <div className={classess.tumbnale}>
       {imageLoad &&<div className='shimmereffect'> </div>}
        <img src={TUMBNAL_IMG+val.poster_path
} alt="" onLoad={()=>setImagLoad(false)} />

      </div></Link>
      <p style={{marginTop:'10px',boxSizing:'border-box'}}>{val.title || val.name}</p>
    </div>) )
    : ( <div  className={classess.contentloader}>
      {[...Array(10)].map((val,index)=>

       <div key={index} >
      <div className={classess.loaderitem}>
    
      </div>
      <p  >
        <span className={classess.textload} >&nbsp;</span>
       
      </p>
    </div>
      )}
      
      </div>)}
   </div>

  {!loadding  && <div className={classess.forwardarrow} onClick={ forward }   >
    <ChevronRight  />
   </div>}

   {!loadding  &&
   <div className={classess.backarrow} > <ChevronLeft onClick={  backward }/></div>}
    </div>
  )
}

export default NowPlaying