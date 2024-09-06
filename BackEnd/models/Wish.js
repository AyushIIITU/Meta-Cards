const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema(
  {
    l1: String,
    l2: String,
    WishBackGroundIMG: String,
    WishFrontIMG: String,
    Wish: 
      {
        Header: [String],
        Body: [String],
        Footer: [String],
      },
    creater: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    type:{
      type: String,
      default: "Public",
      required:true,
      enum:["Public","Private"]
    },
    tokenId:String,
    liked:[{type:mongoose.Schema.ObjectId,
      ref:"User",
      default:[],
      required:true
    }],
  },
  {
    timestamps: true,
  }
);
const Wish = new mongoose.model("Wish", wishSchema);

module.exports = Wish;
