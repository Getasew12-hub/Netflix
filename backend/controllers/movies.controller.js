import db from "../config/database.js";
import {featchMovies} from "../servis/movie.servis.js"

export const Trending=async (req,res) => {
  

    try {
        

     const response=  await featchMovies('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
  
     const getOne=response.results[Math.floor(Math.random()*response.results?.length)];

    return res.status(200).json({trending:getOne})
    } catch (error) {
        console.log("error on trendig movies",error.message);

        return res.status(500).json({error:'Internal server error'});
        
    }
}

export const  getTrending =async (req,res) => {
       
    try {
        const {id}=req.params;
     
       
        const data=await featchMovies(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
    
        return res.status(200).json({vedeo:data.results})
        
    } catch (error) {
        console.log('error on videos detail',error.message);

        return res.status(500).json({error:'Internal server error'})
        
    }
}

export const getMoiveDetail=async (req,res) => {
  

  try {
    const {id}=req.params;

    const data=await featchMovies(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
    
    return res.status(200).json({data})
    
  } catch (error) {
    console.log('error on getmovies detail',error.message);
    return res.status(500).json({error:'Internal server error'})
  }
}

export const getSimilarMovies=async (req,res) => {
    try {
        const {id}=req.params;
        
        const data=await featchMovies(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
     
        return res.status(200).json(data?.results)
    } catch (error) {
        console.log('error on get similar movies',error.message);
        return res.status(500).json({error:'Internal server error'})
    }
}
 
export const getCatagoryMovies=async (req,res) => {
    try {
       const {catagory} =req.params;
        
       const data=await featchMovies(`https://api.themoviedb.org/3/movie/${catagory}?language=en-US&page=1`);

       return res.status(200).json(data.results)
    } catch (error) {
        console.log('error on get catagory movies',error.message);

        return res.status(500).json({error:'Internal server error'})
    }
}