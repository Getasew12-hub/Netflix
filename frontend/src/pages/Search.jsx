import React, { useEffect, useState } from 'react'
import Navbar from '../controller/Navbar'
import classes from "./search.module.css"
import axios from '../middleware/axios';
import { SearchIcon } from 'lucide-react';

import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SearchResult from "../controller/searchResult"
import { useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';

function Search() {
  const location=useLocation();
  const {state}=location

    const [activetab,setactivetab]=useState(state?.type || 'moives');
    const [searchTerm,setSearch]=useState(state?.type || 'moives');
    const [searchinput,setsearchinput]=useState(state?.title || '')
    const [loadding,setLoadding]=useState(false)
    const [contents,setContents]=useState([])
    const [loaddingImg,setloadingimg]=useState([])

    useEffect(()=>{
    if(state?.title && state?.type ){
  reSend()
}
    },[])
    
    function hadleSearch(val){
    if(val=='moives'){
        setSearch('movies')
    }else{
        setSearch('tv')
    }
setsearchinput('')
    setactivetab(val)
    setContents([])
    
    }

   async function searchHit(e){
   
        e.preventDefault();
         if(searchinput.trim().length==0) return
        setLoadding(true)
          try {
            
              const response=await axios.get(`/search/${activetab}/${searchinput}`)
              setContents([])
              setContents(response.data)
              setLoadding(false)
          } catch (error) {
            console.log("error on serachhit",error)
            reSend()
          }
        }

       let count=0
      async  function reSend(){
        if(count==3){
            setLoadding(false)
            return toast.error('Not foun Search match')
        }
        count ++;
          setLoadding(true)
            try {
                const response=await axios.get(`/search/${activetab}/${searchinput}`)
               setContents(response.data)
                setLoadding(false)
                count=0;
            } catch (error) {
                   console.log("error on serachhit",error)
            reSend()
            }
        }

  return (
    <div className={classes.searchcontainer}>
        <Navbar/>
      <div className={classes.item}>
        <div className={classes.navigations}> 
            <button style={{background:activetab=='moives' && "red"}} onClick={()=> hadleSearch('moives')} >Movies</button>
            <button style={{background:activetab=='tv' && "red"}} onClick={()=> hadleSearch('tv')}>Tv Shows</button>
            <button style={{background:activetab=='person' && "red"}} onClick={()=> hadleSearch('person')}>People</button>
        </div>


       
            <form onSubmit={searchHit}>
 <input type="text"  placeholder='Search...' onChange={(e)=> setsearchinput(e.target.value)} value={searchinput} />
 <button>{loadding ? <Loader className='load'/> :<SearchIcon/>}</button>
            </form>

            <div className={classes.posters}>
      {contents.length>0 && contents.map((val,index)=>{
        if(!val.poster_path) return 
        return  <SearchResult activetab={activetab} val={val} key={val.id}/>
        
     }) }
        </div>

        </div>
    </div>
  )
}

export default Search