import express from "express";
import { singup,logout,login, CheckAuth } from "../controllers/auth.commponent.js";
import {protectedRouter} from "../libe/protected.router.js"
const router=express.Router();

router.post("/signup",singup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/checkAuth",protectedRouter,CheckAuth)
export default router;