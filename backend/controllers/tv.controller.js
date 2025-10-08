import db from "../config/database.js";
import {featchMovies} from "../servis/movie.servis.js"

export const tvTrending=async (req,res) => {
    

    try {
        

     const response=  await featchMovies('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
  
     const getOne=response.results[Math.floor(Math.random()*response.results?.length)];
         console.log("we get the one",getOne)
    return res.status(200).json({trending:getOne})
    } catch (error) {
        console.log("error on trendig movies",error.message);

        return res.status(500).json({error:'Internal server error'});
        
    }
}

export const  gettvTrending =async (req,res) => {
    
    try {
        const {id}=req.params;
        console.log("the id is this",id)
        
        const data=await featchMovies(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)

        return res.status(200).json({vedeo:data.results})
        
    } catch (error) {
        console.log('error on videos detail',error.message);

        return res.status(500).json({error:'Internal server error'})
        
    }
}

export const gettvDetail=async (req,res) => {
  

  try {
    const {id}=req.params;
    const data=await featchMovies(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

    return res.status(200).json({data})
    
  } catch (error) {
    console.log('error on getmovies detail',error.message);
    return res.status(500).json({error:'Internal server error'})
  }
}

export const getSimilartv=async (req,res) => {
    try {
        const {id}=req.params;
        const data=await featchMovies(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);

        return res.status(200).json(data?.results)
    } catch (error) {
        console.log('error on get similar movies',error.message);
        return res.status(500).json({error:'Internal server error'})
    }
}

export const getCatagorytv=async (req,res) => {
    try {
       const {catagory} =req.params;
       const data=await featchMovies(`https://api.themoviedb.org/3/tv/${catagory}?language=en-US&page=1`);
       return res.status(200).json(data.results)
    } catch (error) {
        console.log('error on get catagory movies',error.message);

        return res.status(500).json({error:'Internal server error'})
    }
}