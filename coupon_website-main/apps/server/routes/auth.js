import express from "express";

const router = express.Router();

router.get("/login",async(req,res)=>{
    res.send("login")

})
router.get("/signin",async(req,res)=>{
    res.send("signin")

})

router.post("/signup", async(req,res)=>{
    res.send("sighup")
})

export default router;