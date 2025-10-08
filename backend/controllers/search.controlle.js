import db from "../config/database.js"
import { featchMovies } from "../servis/movie.servis.js";

export const getPerson=async (req,res) => {
   
    try {
       
        const {person}=req.params;
        const data=await featchMovies(`https://api.themoviedb.org/3/search/person?query=${person}&include_adult=false&language=en-US&page=1`)
        
        
        if(data.results?.length==0){
            return res.status(404).send(null)
        }
        

  const getExist=await db.query('SELECT * FROM searchhistory WHERE title=$1 AND type=$2 AND userid=$3;',[data.results[0].name,'person',req.user.id])
        
  if(getExist.rows.length==0){
        await db.query('INSERT INTO searchhistory (userid,title,create_at,type) VALUES($1,$2,$3,$4)',[req.user.id,data.results[0].name,new Date(),'person'])
    }
        return res.status(200).json(data.results);
        
    } catch (error) {
        console.log('errror on get person',error.message);
        return res.status(500).json({error:'Interanl server error'})
    }
}


export const getmovies=async (req,res) => {
 
 
    try {
       

        const {movie}=req.params;

        const data=await featchMovies(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`)
        
        if(data?.results?.length==0){
            return res.status(404).send(null)    
        }
       const getExist=await db.query('SELECT * FROM searchhistory WHERE title=$1 AND type=$2 AND userid=$3;',[data.results[0].title,'movie',req.user.id])

       if(getExist.rows.length==0){
        await db.query('INSERT INTO searchhistory (userid,title,create_at,type) VALUES($1,$2,$3,$4)',[req.user.id,data.results[0].title,new Date(),'movie'])
    }

        return res.status(200).json(data.results);
    } catch (error) {
         console.log('errror on get movies',error.message);
        return res.status(500).json({error:'Interanl server error'})
    }
}
export const gettv=async (req,res) => {
 
    try {
       

        const {tv}=req.params;
        const data=await featchMovies(`https://api.themoviedb.org/3/search/tv?query=${tv}&include_adult=false&language=en-US&page=1`)

        if(data?.results?.length==0){
            return res.status(404).send(null)
        }

          const getExist=await db.query('SELECT * FROM searchhistory WHERE title=$1 AND type=$2 AND userid=$3;',[data.results[0].name,'tv',req.user.id])

          if(getExist.rows.length==0){
        await db.query('INSERT INTO searchhistory (userid,title,create_at,type) VALUES($1,$2,$3,$4)',[req.user.id,data.results[0].name,new Date(),'tv'])
        }
        return res.status(200).json(data.results);
    } catch (error) {
         console.log('errror on get tv',error.message);
        return res.status(500).json({error:'Interanl server error'})
    }
}

export const getSerachHistotry=async (req,res) => {
   

    try {
       
        const gethistory=await db.query('SELECT * FROM searchhistory WHERE userid=$1 ORDER BY id DESC;',[req.user.id]);
        
        return res.status(200).json(gethistory.rows);
    } catch (error) {
    console.log('errror on  get search history',error.message);
        return res.status(500).json({error:'Interanl server error'})
    }
}


export const removeSearch=async (req,res) => {
    

    try {
       
        const {id}=req.params;

       await db.query('DELETE FROM searchhistory WHERE id=$1;',[id])

        return res.status(200).send();
    } catch (error) {
    console.log('errror on  get remove search history',error.message);
        return res.status(500).json({error:'Interanl server error'})
    }
}