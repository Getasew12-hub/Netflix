import axios from "../middleware/axios"
import React, { useRef } from 'react'
import { useState } from "react"
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import movieTvStore from "../store/movieTvStore"
import Navbar from "../controller/Navbar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Reactplayer from "react-player"
import classess from "./watch.module.css"
import { utilitis } from "../utlitis/utiliti"



function WatchPage() {
  
        const sliderRef=useRef()
    const {contentType}=movieTvStore()
    const {id}=useParams()
  const [trailer,setTrailer]=useState([]);
  const [moredetailContent,setMoreDtail]=useState(null);
  const [similar,setSimilar]=useState([]);
  const [currentindex,setCurrentIndex]=useState(0);
  const [loadding,setLoadding]=useState(true)
  const [loaddingAll,setloaddingall]=useState(0)

 

    useEffect(()=>{
       const moreDetail=async () => {
        try {

            const response=await axios.get(`/${contentType}/${id}/moviedetail`);
         
            setMoreDtail(response.data.data)
            setloaddingall(loaddingAll+1)
        } catch (error) {
            console.log("error on get traile is this",error)
            setMoreDtail(null)
            moreDetail()
        }
       }

       moreDetail()
    },[id,contentType])
    useEffect(()=>{
       const Similars=async () => {
        try {

            const response=await axios.get(`/${contentType}/${id}/similar`);
         
            setSimilar(response.data)
            setloaddingall(loaddingAll+1)
        } catch (error) {
            console.log("error on get traile is this",error)
            setSimilar([])
            Similars()
        }
         
        
       }

       Similars()
    },[id,contentType])

        useEffect(()=>{
      setLoadding(true)
       const getTrailer=async () => {
        try {

            const response=await axios.get(`/${contentType}/${id}/trending`);
             setloaddingall(loaddingAll+1)
            setTrailer(response.data.vedeo)
             setLoadding(false)
        } catch (error) {
            console.log("error on get traile is this",error)
            setTrailer([])
            getTrailer();
        }
       }

       getTrailer()
    },[id,contentType])
  
    if(loadding ) return <div className={classess.watchload}>
      <div className={classess.first }><span className={`shimmereffect`} ></span> bring</div>

      <div  className={classess.second}><span className={`shimmereffect`}></span></div>

      <div className={classess.sidebyside}>
        <div className={classess.left}>  <span className={`shimmereffect`}></span></div>
        <div className={classess.right}>  <span className={`shimmereffect`}></span></div>
     
    

      </div  >
      <div  className={classess.last}> <span className={`shimmereffect`}></span></div>
     
    </div>
    function Next(){
      if(currentindex<trailer.length-1){
        setCurrentIndex(currentindex+1)
      }
    }
    function Pre(){
if(currentindex>0){
        setCurrentIndex(currentindex-1)
      }
    }


    function FormatedDate(date){
      if(!date) return
        return new Date(date).toLocaleString('en-US',{
          year:'numeric',
          month:'long',
          day:'numeric'
        })
    }


  
    
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


   
    if(trailer.length==0 || !trailer[0]?.key) return <div style={{textAlign:'center',height:'100vh'}}>
         <Navbar/>
      No trailer is available </div>
  return (
    <div className={classess.contanier}>

   
        <Navbar/>
        <div className={classess.itemcontenter}>
        <div className={classess.controller}>
          <button disabled={currentindex==0} style={{background: currentindex==0 && 'rgb(61, 61, 61)'}} onClick={Pre}>
            <ChevronLeft />
          </button>
          <button disabled={currentindex>=trailer.length-1} style={{background: currentindex>=trailer.length-1 && 'rgb(61, 61, 61)'}}>
            <ChevronRight onClick={Next}/>
          </button>


        </div>

        <div className={classess.content}>
         {trailer.length>0 &&
<Reactplayer src={`https://www.youtube.com/watch?v=${trailer[currentindex]?.key}`} width={'100%'} height={'100%'}   controls={true} />}

   {trailer.length==0 && 
   <div style={{textAlign:'center'}}>
    No trailer is available 
    </div>}
        </div>

        {/* more detaile */}

     {moredetailContent &&  <div className={classess.detaile}>
          <div>
            <h2>{moredetailContent?.title || moredetailContent?.name}| {moredetailContent?.adult ? '18+' : 'PG 13'}</h2>
             <p>{FormatedDate(moredetailContent?.release_date)}</p>

             <p>{moredetailContent?.overview}</p>
          </div>
       
          <img src={utilitis.ORGINAL_IMG+moredetailContent?.backdrop_path} alt="" />
          
        </div>}
        
{similar.length>0 &&
         <div   className={classess.main}>
     
     <h2 style={{margin:'10px 0'}}>Similar Movies/TV Shows</h2>
   <div className={classess.contents} ref={sliderRef}>
    
    {!loadding &&  (similar?.map((val)=>{
  if(!val.poster_path) return;
   return <div key={val.id} className={classess.contentitem}>
    <Link to={`/watch/${val.id}`}>  <div className={classess.tumbnale}>
        <img src={utilitis.TUMBNAL_IMG+val.poster_path
} alt="" />
      </div></Link>
      <p style={{marginTop:'10px',boxSizing:'border-box'}}>{val.title || val.name}</p>
    </div>}) )}
  
   </div>

  <div className={classess.forwardarrow} onClick={ forward }   >
    <ChevronRight  />
   </div>

  
   <div className={classess.backarrow} > <ChevronLeft onClick={  backward }/></div>
    </div>
}
    
        </div>
    </div>
  )
}

export default WatchPage


