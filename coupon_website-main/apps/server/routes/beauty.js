import express from "express";

const router = express.Router();


router.get("/beauty",async(req,res)=>{
    res.send("beauty")

})

export default router;