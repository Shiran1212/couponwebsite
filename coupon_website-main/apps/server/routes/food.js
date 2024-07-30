import express from "express";

const router = express.Router();


router.get("/food",async(req,res)=>{
    res.send("food")

})

export default router;