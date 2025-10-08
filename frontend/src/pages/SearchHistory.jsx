import React, { useEffect, useState } from 'react'
import Navbar from '../controller/Navbar'
import axios from "../middleware/axios"
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
  function formdata(date){
    const d=new Date(date)
    return d.toLocaleString('en-US',{
        day:'numeric',
        month:'long',
        year:'numeric'
    })

  }
function SearchHistory() {
    const navigator=useNavigate()
    const [loadding,setLoadding]=useState(true)
    const [contents,setcontents]=useState([])


    useEffect(()=>{
         const getHistory=async () => {
            setLoadding(true)
            try {
                const response=await axios.get('/search/search');
                setcontents(response.data)
             
            } catch (error) {
                console.log('erro on get history',error);
                setcontents([])
            }finally{
                setLoadding(false)
            }
         }

         getHistory()
    },[])
  

   async function deleteItem(e,id){
  e.stopPropagation()
  let preitem=[...contents]
  preitem=preitem.filter((val)=> val.id!==id);

  setcontents(preitem)
  await axios.delete(`/search/search/${id}`);
    }

    function handleSearch(title,type){
   toast.success('i am click')
   navigator(`/search`,{state:{title,type}})
    }




    if(contents?.length==0 && !loadding) return <div style={{minHeight:'100vh'}}>
        <Navbar/>
        <h1 style={{textAlign:'center',margin:'20px 0'}}>Search history</h1>
        <div style={{textAlign:'center'}}>Not found search history</div>
        </div>



  return (
    <div style={{minHeight:'100vh',maxWidth:'1000px',margin:'0 auto'}}>
        <Navbar/>
        <h1 style={{textAlign:'center',margin:'20px 0'}}>Search history</h1>

        <div style={{display:'flex',gap:'25px',flexWrap:'wrap',padding:'10px',cursor:'pointer'}} >
  {!loadding ? contents?.map((val)=>
    
<div key={val.id} style={{background:'rgb(26, 41, 57)',padding:'10px',borderRadius:'4px',display:'flex',gap:'20px',maxWidth:'250px',alignItems:'center'}} onClick={()=> handleSearch(val.title,val.type)}>

    <div>
<h4>{val.title}</h4>
<p style={{color:'gray',fontSize:'12px',marginTop:'5px'}}>{formdata(val.create_at)}  <span style={{marginLeft:'20px'}}>{val.type}</span></p>
</div>
<p style={{color:'gray',cursor:'pointer'}} onClick={(e)=> deleteItem(e,val.id)}><X /></p>
</div>) 
:([...Array(15)].map((val,index)=> <div style={{position:'relative',height:'50px',width:'130px',borderRadius:'4px',overflow:'hidden'}} >
<div  className='shimmereffect'></div>
</div>))
  }
</div>
    </div>
  )
}

export default SearchHistory