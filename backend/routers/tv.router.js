
import { tvTrending,getCatagorytv,getSimilartv, gettvTrending, gettvDetail } from "../controllers/tv.controller.js";
import exprss from "express";

const router=exprss.Router();
router.get("/trending",tvTrending)
router.get("/:id/trending",gettvTrending)
router.get("/:id/moviedetail",gettvDetail)
router.get("/:id/similar",getSimilartv)
router.get("/:catagory",getCatagorytv)
export default router;