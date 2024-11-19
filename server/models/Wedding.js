const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema(
  {
    WeddingBackGroundIMG: String,
    Front: {
      IMG: String,
      Name: String,
      Font: String,
      Color: String,
      FontSize: Number,
      Desing: String,
    },
    Back: {
      IMG: String,
      Headings: [String],
      Para: [String],
      Font1: String,
      Font2: String,
      Color: String,
      Desing: String,
    },
    creater: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    type:{
      type: String,
      default: "Public",
      required: true,
      enum:["Public","Private"]
    },
    tokenId:String,
    liked:[{type:mongoose.Schema.ObjectId,
      ref:"User"}],
  },
  {
    timestamps: true,
  }
);
const Wedding = new mongoose.model("Wedding", weddingSchema);

module.exports = Wedding;
