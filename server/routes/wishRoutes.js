const express = require("express");
const router = express.Router();
const uploadWithDestination = require("../multer");
const WishDetails = require("../models/Wish");
const fs = require("fs");
const { generateTokenWithoutExp, jwtAuthMiddleware } = require("../jwt");
const Wish = require("../models/Wish");
const User = require("../models/User");
const fields = [
  { name: "WishBackGroundIMG", maxCount: 1 },
  { name: "WishFrontIMG", maxCount: 1 },
];

router.post(
  "/",
  uploadWithDestination("any", fields, "./uploads/wish"),
  async (req, res) => {
    try {
      if (!req.files || !req.body) {
        return res.status(400).json({ message: "Files and body are required" });
      }
      const WishBackGroundIMGPath = req.files["WishBackGroundIMG"]
        ? req.files["WishBackGroundIMG"][0]?.path
        : null;
      const WishFrontIMGPath = req.files["WishFrontIMG"]
        ? req.files["WishFrontIMG"][0]?.path
        : null;
      const { l1, l2, Wish, creater, type } = req.body;

      if (!Wish || !Wish["Body"] || !creater) {
        return res
          .status(400)
          .json({ message: "Body and Creater are required" });
      }
      const token = generateTokenWithoutExp(Wish);
      const wish = new WishDetails({
        l1,
        l2,
        WishBackGroundIMG: WishBackGroundIMGPath,
        WishFrontIMG: WishFrontIMGPath,
        Wish,
        creater,
        type: type ? type : "Private",
        tokenId: token,
      });
      const response = await wish.save();
      res.status(201).json(response);
    } catch (err) {
      console.error("Error in registering wish:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const Wish = await WishDetails.find({ creater: id });
    if (!Wish) {
      return res.status(404).json({ message: "No Public Wish Found" });
    }
    res.status(200).json(Wish);
  } catch (err) {
    // console.error("Error in fetching Wish",err)
    return res.status(500).json("Internal Server Error");
  }
});
router.get("/all", async (req, res) => {
  try {
    const allwishs = await WishDetails.find();
    if (!allwishs || allwishs.length === 0) {
      return res.status(404).json({ message: "No wishs Found" });
    }
    res.status(200).json(allwishs);
  } catch (error) {
    console.error("Error fetching wishs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/public", async (req, res) => {
  try {
    const wishes = await WishDetails.find({ type: "Public" })
      .populate({
        path: "creater",
        select: "name -_id",
      })
      .select("-tokenId");

    if (!wishes || wishes.length === 0) {
      return res.status(404).json({ message: "No Public Wish Found" });
    }

    res.status(200).json(wishes);
  } catch (err) {
    console.error("Error in fetching Public Wish", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET route to fetch wish details by ID
router.get("/get/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const wish = await WishDetails.findById(id);

    if (!wish) {
      return res.status(404).json({ message: "wish Not Found" });
    }

    return res.status(200).json(wish);
  } catch (err) {
    console.error("Error fetching wish details:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/get/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const wish = await Wish.findById(id);
    if (!wish) {
      return res.status(404).json({ message: "wish Not Found" });
    }
    if (wish.type === "public") {
      return res.status(200).json(wish);
    }
    if (wish.tokenId !== req.userToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json(wish);
  } catch (err) {
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
router.post("/like", async (req, res) => {
  try {
    const { id, user } = req.body;
    const Wish = await WishDetails.findById(id);
    if (!Wish) {
      return res.status(404).json({ message: "No Wish Found" });
    }
    if (!Wish.liked.includes(user)) {
      Wish.liked.push(user);
    } else {
      return res.status(400).json({ message: "User already liked this Wish" });
    }
    const response = await Wish.save();
    res.status(200).json(response);
  } catch (err) {
    console.error("Error in liking Wish", err);
    return res.status(500).json("Internal Server Error");
  }
});
router.post("/unlike", async (req, res) => {
  try {
    const { id, user } = req.body;
    const Wish = await WishDetails.findById(id);
    if (!Wish) {
      return res.status(404).json({ message: "No Wish Found" });
    }
    Wish.liked = Wish.liked.filter((item) => item != user);
    const response = await Wish.save();
    res.status(200).json(response);
  } catch (err) {
    console.error("Error in liking Wish", err);
    return res.status(500).json("Internal Server Error");
  }
});
router.get("/change/:id/:type", async (req, res) => {
  try {
    const id = req.params.id;
    const type = req.params.type;
    const wish = await WishDetails.findByIdAndUpdate(id, { type: type });
    if (!wish) {
      return res.status(404).json({ message: "No wish Found" });
    }
    return res.status(200).json(wish);
  } catch (err) {
    console.error("Error in changing type", err);
  }
});

module.exports = router;
