const express = require("express");
const router = express.Router();
const uploadWithDestination = require("../multer");
const CakeDetails = require("../models/Cake");
const fs = require("fs");
const { generateTokenWithoutExp } = require("../jwt");
const Cake = require("../models/Cake");
const fields = [{ name: "CakeBackGroundIMG", maxCount: 1 }];

// POST route to create a new cake entry
router.post(
  "/",
  uploadWithDestination("any", fields, "./uploads/Cake"),
  async (req, res) => {
    try {
      const CakeBackGroundIMGPath = req.files["CakeBackGroundIMG"]
        ? req.files["CakeBackGroundIMG"][0]?.path
        : null;

      const { message, l1, l2, l3, BName, creater,type } = req.body;

      if (!message || !creater) {
        return res.status(400).json({ message: "Message and Creater are required" });
      }

      const cake = new CakeDetails({
        message,
        l1,
        l2,
        l3,
        CakeBackGroundIMG: CakeBackGroundIMGPath,
        BName,
        creater,
        type:type?type:"private",
        tokenId:generateTokenWithoutExp(message)
      });

      const response = await cake.save();
      res.status(201).json(response);
    } catch (err) {
      console.error("Error in registering Cake:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
router.get('/all', async (req, res) => {
    try {
        const allCakes = await CakeDetails.find();
        if (!allCakes || allCakes.length === 0) {
            return res.status(404).json({ message: "No Cakes Found" });
        }
        res.status(200).json(allCakes);
    } catch (error) {
        console.error('Error fetching cakes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route to fetch cake details by ID
router.get("/:id/:token", async (req, res) => {
  try {
    const id = req.params.id;
    const token=req.params.token;
    const cake = await CakeDetails.findById(id);
  
    if (!cake) {
      return res.status(404).json({ message: "Cake Not Found" });
    }
    if(cake.type==="public"){
      return res.status(200).json(cake);
    }
    if(cake.tokenId!==token){
      return res.status(401).json({message:"Unauthorized"})
    }
    return res.status(200).json(cake);
  } catch (err) {
    console.error("Error fetching Cake details:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

  
// DELETE route to remove a cake entry by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cake = await CakeDetails.findByIdAndDelete(id);

    if (!cake) {
      return res.status(404).json({ message: "Cake Not Found" });
    }

    if (cake.CakeBackGroundIMG && fs.existsSync(cake.CakeBackGroundIMG)) {
      fs.unlinkSync(cake.CakeBackGroundIMG);
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    console.error("Error deleting Cake:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/public",async(req,res)=>{
  try {
    const cake= await Cake.find({type:"public"});
    if(!cake){
      return res.status(404).json({message:"No Public cake Found"})
    }
    res.status(200).json(cake);
  } catch (err) {
    console.error("Error in fetching Public cake",err)
    return res.status(500).json("Internal Server Error")
    // console.error("Erorr in cake Link",err)
  }
})

module.exports = router;
