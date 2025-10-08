import pg from "pg";
import { ENV_VARS } from "./envVars.js";

const {neon_key}=ENV_VARS

const connectionString=neon_key;


const db=new pg.Pool({
   connectionString,
   ssl:{
    rejectUnauthorized:false,
   }
    
})


export default db;