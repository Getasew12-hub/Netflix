import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js";
import db from "../config/database.js";

export const protectedRouter =async (req,res,next) => {
    try {
        const token=req.cookies.token;

        if(!token) return res.status(401).json({error:'Unautorize'});
        const decode=jwt.verify(token,ENV_VARS.key);

        if(!decode) return res.status(401).json({error:'Invalid token'});

        const getuser=await db.query('SELECT * FROM userinfo WHERE id=$1;',[decode.id]);

        if(getuser.rows.length==0) return res.status(401).json({error:'Invalid token'});

        const user=getuser.rows[0];
        req.user=user;
        next()
        
    } catch (error) {
       console.log('error on protected router',error.message) ;
       return res.status(500).json({error:'Internal server error'})
    }
}