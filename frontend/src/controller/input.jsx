import React from 'react'

function input({lable,lablename,...pro}) {
  return (
    <div style={{marginBottom:'10px'}}>
    <label htmlFor={lablename} style={{display:'block',color:'white'}}>{lable}</label>
    <input {...pro}  style={{width:'100%',padding:"10px",borderRadius:'5px',background:'transparent',color:'white',border:'1px solid gray',boxSizing:'border-box',marginTop:'5px',fontSize:'17px'}}/>
    </div>
  )
}

export default input