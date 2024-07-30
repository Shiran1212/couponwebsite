import express from "express";

const router = express.Router();


router.get("/homepage",async(req,res)=>{
    res.send("homepage")

})

export default router;