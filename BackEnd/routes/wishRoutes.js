const express = require("express");
const router = express.Router();
const uploadWithDestination = require("../multer");
const WishDetails = require("../models/Wish");
const fs = require("fs");
const fields = [{ name: "WishBackGroundIMG", maxCount: 1 },{name:"WishFrontIMG",maxCount:1}];


router.post("/",uploadWithDestination("any", fields, "./uploads/wish"),async (req, res) => {
    console.log(req.body)
    try {
      const WishBackGroundIMGPath = req.files["WishBackGroundIMG"]
        ? req.files["WishBackGroundIMG"][0]?.path
        : null;
        const WishFrontIMGPath = req.files["WishFrontIMG"]
        ? req.files["WishFrontIMG"][0]?.path
        : null;
      const {l1, l2,Wish, creater } = req.body;

      if (!Wish['Body']|| !creater) {
        return res.status(400).json({ message: "Body and Creater are required" });
      }

      const wish = new WishDetails({
        l1,
        l2,
        WishBackGroundIMG: WishBackGroundIMGPath,
        WishFrontIMG:WishFrontIMGPath,
        Wish,
        creater,
      });

      const response = await wish.save();
      res.status(201).json(response);
    } catch (err) {
      console.error("Error in registering wish:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
router.get('/all', async (req, res) => {
    try {
        const allwishs = await WishDetails.find();
        if (!allwishs || allwishs.length === 0) {
            return res.status(404).json({ message: "No wishs Found" });
        }
        res.status(200).json(allwishs);
    } catch (error) {
        console.error('Error fetching wishs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route to fetch wish details by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const wish = await WishDetails.findById(id);

    if (!wish) {
      return res.status(404).json({ message: "wish Not Found" });
    }

    res.status(200).json(wish);
  } catch (err) {
    console.error("Error fetching wish details:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

  
// DELETE route to remove a wish entry by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const wish = await WishDetails.findByIdAndDelete(id);

    if (!wish) {
      return res.status(404).json({ message: "wish Not Found" });
    }

    if (wish.WishBackGroundIMG && fs.existsSync(wish.WishBackGroundIMG)) {
      fs.unlinkSync(wish.WishBackGroundIMG);
    }
    if (wish.WishFrontIMG && fs.existsSync(wish.WishFrontIMG)) {
        fs.unlinkSync(wish.WishFrontIMG);
      }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    console.error("Error deleting wish:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
