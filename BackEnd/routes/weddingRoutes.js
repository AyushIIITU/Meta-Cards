const express = require("express");
const router = express.Router();
const uploadWithDestination = require("../multer");
const WeddingDetails = require("../models/Wedding");
const fs = require("fs");
const { create } = require("domain");
const { generateTokenWithoutExp, jwtAuthMiddleware } = require("../jwt");
const Wedding = require("../models/Wedding");
const fields = [
  { name: "WeddingBackGroundIMG", maxCount: 1 },
  { name: "WeddingBackIMG", maxCount: 1 },
  { name: "WeddingFrontIMG", maxCount: 1 },
];

router.post(
  "/",
  uploadWithDestination("any", fields, "./uploads/wedding"),
  async (req, res) => {
    try {
      const WeddingBackGroundIMGpath = req.files["WeddingBackGroundIMG"]
        ? req.files["WeddingBackGroundIMG"][0]?.path
        : null;
      const WeddingBackIMGpath = req.files["WeddingBackIMG"]
        ? req.files["WeddingBackIMG"][0]?.path
        : null;
      const WeddingFrontIMGpath = req.files["WeddingFrontIMG"]
        ? req.files["WeddingFrontIMG"][0]?.path
        : null;
      const { f1, f2, f3, c1, c2, d1, d2, s1, l1, l2, l3, creater,type } = req.body;

      if (!creater) {
        return res
          .status(400)
          .json({ message: "Body and Creater are required" });
      }

      const wedding = new WeddingDetails({
        WeddingBackGroundIMG: WeddingBackGroundIMGpath,
        Front: {
          IMG: WeddingFrontIMGpath,
          Name: l1,
          Font: f1,
          Color: c1,
          FontSize: s1,
          Desing: d1,
        },
        Back: {
          IMG: WeddingBackIMGpath,
          Headings: l2,
          Para: l3,
          Font1: f2,
          Font2: f3,
          Color: c2,
          Desing: d2,
        },
        creater: creater,
        type:type?type:"Private",
        tokenId:generateTokenWithoutExp(l1)
      });
      const response = await wedding.save();
      res.status(201).json(response);
    } catch (err) {
      console.error("Error in registering wedding:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
router.get("/all", async (req, res) => {
  try {
    const allweddings = await WeddingDetails.find();
    if (!allweddings || allweddings.length === 0) {
      return res.status(404).json({ message: "No weddings Found" });
    }
    res.status(200).json(allweddings);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/user/:id",async(req,res)=>{
  try {
    const id=req.params.id;
    
    const Wedding= await WeddingDetails.find({creater:id});
    if(!Wedding){
      return res.status(404).json({message:"No Public Wedding Found"})
    }
    res.status(200).json(Wedding);
  } catch (err) {
    // console.error("Error in fetching Wedding",err)
    return res.status(500).json("Internal Server Error")
  }
})
router.get("/public", async (req, res) => {
  try {
    const wedding = await WeddingDetails.find({ type: "Public" })
      .populate({
        path: 'creater',
        select:'name -_id'
      }).select('-tokenId')
      

    if (!wedding ||wedding.length === 0) {
      return res.status(404).json({ message: "No Publicwedding Found" });
    }

    res.status(200).json(wedding);
  } catch (err) {
    console.error("Error in fetching Publicwedding", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/get/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const wedding = await WeddingDetails.findById(id);

    if (!wedding) {
      return res.status(404).json({ message: "wedding Not Found" });
    }

    return res.status(200).json(wedding);
  } catch (err) {
    console.error("Error fetching wedding details:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/get/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const wedding = await WeddingDetails.findById(id);
    if (!wedding) {
      return res.status(404).json({ message: "wedding Not Found" });
    }
    if (wedding.type === "public") {
      return res.status(200).json(wedding);
    }
    if (wedding.tokenId !== req.userToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json(wedding);
  } catch (err) {
     res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE route to remove a wedding entry by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const wedding = await WeddingDetails.findByIdAndDelete(id);

    if (!wedding) {
      return res.status(404).json({ message: "wedding Not Found" });
    }

    if (wedding.weddingBackGroundIMG && fs.existsSync(wedding.weddingBackGroundIMG)) {
      fs.unlinkSync(wedding.weddingBackGroundIMG);
    }
    if (wedding.Back.IMG && fs.existsSync(wedding.Back.IMG)) {
      fs.unlinkSync(wedding.Back.IMG);
    }
    if (wedding.Front.IMG && fs.existsSync(wedding.Front.IMG)) {
      fs.unlinkSync(wedding.Front.IMG);
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    console.error("Error deleting wedding:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/change/:id/:type",async(req,res)=>{
  try {
    const id=req.params.id;
    const type=req.params.type;
    const wedding=await WeddingDetails.findByIdAndUpdate(id,{type:type});
    if(!wedding){
      return res.status(404).json({message:"No wedding Found"})
    }
    return res.status(200).json(wedding);
  
  } catch (err) {
    console.error("Error in changing type",err);
  }
})
module.exports = router;
