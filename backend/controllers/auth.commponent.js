import db from "../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ENV_VARS } from "../config/envVars.js";


const salt=10;
function generateToken(userid,res){
    const token=jwt.sign({id:userid},ENV_VARS.key,{expiresIn:'7d'});
   res.cookie('token',token,{
    httpOnly:true,
    sameSite:'strict',
    secure:process.env.NODE_ENV=='production',
    maxAge:1000*60*60*24*7
   })
}
export const singup=async (req,res) => {
   
   
  try {
    
    const {username,email,password}=req.body;
   
   

if(!username || !email || !password) return res.status(404).json({type:'all',error:'All input is required'})

    if(username.trim().length==0 || email.trim().length==0 || password.trim().length==0){
        return res.status(404).json({type:'all',error:'All input is required'})
    }
    
   
    if(password.trim().length<6) return res.status(404).json({type:'password',error:'Password character must be greater than 5'})
 
 
    const checkUser=await db.query('SELECT * FROM userinfo WHERE email=$1;',[email]);
    const cheusername=await db.query('SELECT * FROM userinfo WHERE  username=$1;',[username]);

    
    if(checkUser.rows.length>0) return res.status(404).json({type:'email',error:'User already exsist,please try to login'});
    if(cheusername.rows.length>0) return res.status(404).json({type:'username',error:'Username already exsist,please try to login'});
   
   const  hashPassword=await bcrypt.hash(password,salt);

  if(!hashPassword) return res.status(500).json({error:'Interanal server error'})
   const newuser=await db.query("INSERT INTO  userinfo(username,email,password) VALUES($1,$2,$3) RETURNING *;",[username,email,hashPassword]);

   await generateToken(newuser.rows[0].id,res)
     return res.status(201).json({...newuser.rows[0],password:undefined})

    
  } catch (error) {
    console.log('error on singup page',error.message);
    return res.status(500).json({type:'all',error:"Internal server error"})
  }
}
export const login=async (req,res) => {
  
    try {
        

        const {password,email}=req.body;
        if(!password || !email) return res.status(400).json({error:'All input is required'})
       
      const  getuser=await db.query('SELECT * FROM userinfo WHERE email=$1;',[email]);
      if(getuser.rows.length==0) return res.status(404).json({error:'Email is not found'});
      const user=getuser.rows[0];
      
      const checkPassword=await bcrypt.compare(password,user.password);
      if(!checkPassword) return res.status(404).json({error:'Incorect password'});

      await generateToken(user.id,res);

      return res.status(200).json({...user,password:undefined})
        
    } catch (error) {
        console.log('error on login',error.message);
        return res.status(500).json({error:'Internal server error'})
        
    }
}
export const logout=async (req,res) => {
    try {
         res.clearCookie("token");
         return res.status(200).json({message:'success'})
    } catch (error) {
        console.log("error on logout",error.message)
        return res.status(500).json({error:'Internal server error'})
    }
   
}


export const CheckAuth=async (req,res) => {
  try {
    return res.status(200).json(req.user)
  } catch (error) {
    console.log('error on check auth',error.message);
    return res.status(500).json({error:'Internal server error'})
  }
}