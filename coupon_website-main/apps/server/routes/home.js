import express from "express";

const router = express.Router();


router.get("/home",async(req,res)=>{
    res.send("home")

})

export default router;