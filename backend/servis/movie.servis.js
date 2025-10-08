import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export async function featchMovies(url){
const options = {

  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '+ ENV_VARS.movie_key,
  }
};

  const response=await axios.get(url,options)
      
  if(response.status!==200){
    throw new Error("error in response"+ response.statusText);
    
  }
 
  return response.data;
}