import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { utilitis } from '../utlitis/utiliti';
import clasess from "./search.module.css"

function searchResult({activetab,val}) {
    const link =activetab=='person' ? "/start" :`/watch/${val.id}`  
    const [loadding,setLoadding]=useState(true)
    function handleLoad(){
        setLoadding(false)
    }
    const {ORGINAL_IMG}=utilitis;
  return (
    <div>
         <Link to={ link}  key={val.id}> <div >
        
        <div className={clasess.contaner}>

        {loadding && <div className='shimmereffect'/>}

            <img src={ORGINAL_IMG+val.poster_path} alt={val.title} onLoad={ handleLoad} className={clasess.searchposter} />
            </div>
            <p>{val.title} </p>
        </div></Link>
    </div>
  )
}

export default searchResult