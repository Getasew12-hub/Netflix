import express from "express";
import  authRouter from "./routers/auth.router.js"
import moviesRouter from "./routers/movies.router.js"
import tvRouter from "./routers/tv.router.js"
import searchRouter from "./routers/search.router.js"
import { ENV_VARS } from "./config/envVars.js";
import cookieParser from "cookie-parser";
import path from "path"
const __dirname=path.resolve()

import env from "dotenv";

import { protectedRouter } from "./libe/protected.router.js";

env.config()
const app=express();

const port=ENV_VARS.port;
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',authRouter)
app.use('/api/movies',protectedRouter,moviesRouter)
app.use('/api/tv',protectedRouter,tvRouter)
app.use('/api/search',protectedRouter,searchRouter)

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'frontend/dist')));
    app.use((req,res)=>{
        res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
    })
}


app.listen(port,()=>{
    console.log('your server running on port:',port)
})