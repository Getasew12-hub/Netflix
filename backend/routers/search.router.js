import express from "express";
import {getmovies, getPerson, getSerachHistotry, gettv, removeSearch} from "../controllers/search.controlle.js"
const router=express.Router();
router.get("/person/:person",getPerson)
router.get("/moives/:movie",getmovies)
router.get('/tv/:tv',gettv)

router.get('/search',getSerachHistotry)
router.delete('/search/:id',removeSearch)
export default router;