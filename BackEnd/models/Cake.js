const mongoose = require("mongoose");

const cackSchema = new mongoose.Schema(
  {
    message: String,
    l1: String,
    l2: String,
    l3: String,
    CakeBackGroundIMG: String,
    BName: {
      Name: String,
      Font: String,
      Color: String,
    },
    creater: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      default: "public",
      require: true,
      enum: ["public", "private"],
    },
    tokenId: String,
    liked: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
const Cake = new mongoose.model("Cake", cackSchema);

module.exports = Cake;
