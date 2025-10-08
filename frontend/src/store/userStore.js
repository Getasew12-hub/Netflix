import {create} from "zustand"
import axios from "../middleware/axios"
import toast from "react-hot-toast";

const userStore=create((set,get)=>({
    error:{},
    loadding:false,
    user:null,
    checkAuth:true,
    
    SignUp:async (val) => {
      set({error:{}})
         const {email,password,username}=val;
         if(!email  || email?.trim().length==0 ){
              set((pre)=>({
               error:{
                  ...pre.error,
                  email:'Email is reqired'
               }
            }));
         }
   
   
         if(password?.trim().length<6){
             set((pre)=>({
               error:{
                  ...pre.error,
                  password:'password needs at list 6 characters'
               }
            }));
         }
         if(!username || username?.trim().length==0){
             set((pre)=>({
               error:{
                  ...pre.error,
                  username:'Username is reqired'
               }
            }));

         
         }
          
         if(Object.keys(get().error).length>0){
            return
         }

   try {
    set({loadding:true})

    const response=await axios.post("/auth/signup",{email,password,username});
    set({user:response.data});
    toast.success('Successfully singup')
    
   } catch (error) {
    console.log('error on signup ',error.response);
    let type=error.response.data.type;
    
          set((pre)=>({
            error:{
               ...pre.error,
               [type]:error.response.data.error
            }
          }))
    toast.error(error.response.data.error || 'Faild to singup')
   }finally{
    set({loadding:false})
   }
         

         
    },

    Loginuser:async (val) => {
      const {email,password}=val;
      if(!email || !password || email.trim().length==0 || password.trim().length==0){
         return set({error:{error:'Please insert all required value'}})
      }

      try {
         set({loadding:true})
           const response=await axios.post("/auth/login",{email,password});
             set({user:response.data})
      } catch (error) {
         console.log('error on login',error.response.data.error);
         set({error:{error:error.response.data.error || null}})
         toast.error(error.response.data.error || 'Faild to login')
      }finally{
         set({loadding:false})
      }
    },
  AuthCheck:async () => {
  
     set({checkAuth:true})
     try {
         const response=await axios.post('/auth/checkAuth');
         set({user:response.data})

        
     } catch (error) {
      set({user:null})
     }finally{
      set({checkAuth:false})
     }
  },

  Logout:async () => {
   set({loadding:true});
   try {
       await axios.post("/auth/logout");
       set({user:null})
   } catch (error) {
      console.log("error on logout",error.response.data.error);
      toast.error(error.response.data.error || "Faild to logout")
   }finally{
      set({loadding:false})
   }
  }
}))

export default userStore;