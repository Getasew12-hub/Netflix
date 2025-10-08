import express from "express";

import { Trending ,getTrending,getMoiveDetail,getSimilarMovies,getCatagoryMovies} from "../controllers/movies.controller.js";
const router=express.Router();
router.get("/trending",Trending)
router.get("/:id/trending",getTrending)
router.get("/:id/moviedetail",getMoiveDetail)
router.get("/:id/similar",getSimilarMovies)
router.get("/:catagory",getCatagoryMovies)
export default router;