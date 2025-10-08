import  {create} from "zustand";
import axios from "../middleware/axios"
import  {toast} from "react-hot-toast"

const  movieTvStore=create((set,get)=>({
    loadding:false,
    contentLoad:false,
    banner:null,
    Contents:[],
   contentType:'movies',
   changeContentType:false,

   ChangeContentType:(val)=>{
   
    if(val!==get().contentType){
set({changeContentType:true})
    }
    set({contentType:val})
},
    getBanner:async () => {

        if(get().banner && !get().changeContentType ) return
        console.log("i am call now and you like me so like yoeu me ")
        set({loadding:true,banner:null})
        try {
            const response=await axios.get(`/${get().contentType}/trending`);
          
            set({banner:response.data.trending})
            set({loadding:false})
        } catch (error) {
            console.log(error.response.data.error);
            get().getBanner()
        }
    },
       FeatchContent:async(catagory)=>{
         set({contentLoad:true})
        
   
         if(get().Contents[catagory] && !get().changeContentType ) return
        try {
        const res=await axios.get(`/${get().contentType}/${catagory}`);
        
      
            set((state) => ({
    Contents: {
        ...state.Contents,
        [catagory]: res.data
    },
    changeContentType:false
}));
        

        
        } catch (error) {
            console.log("error on catagory contentes",error)
        //    get().FeatchContent();
        
        }
      }
       
}))


export default movieTvStore;