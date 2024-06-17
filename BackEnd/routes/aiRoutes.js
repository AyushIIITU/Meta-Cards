const express=require('express');
const route=express();
const dotenv=require('dotenv');
const {GoogleGenerativeAI}=require('@google/generative-ai');
dotenv.config();
const genAI=new GoogleGenerativeAI(process.env.AI_API_KEY);
route.get("/:type",async (req,res)=>{
    try {
        
   
    const model=genAI.getGenerativeModel({model:"gemini-pro"});
    const type=req.params.type;
    var prompt="";
    if(type=='cake'){
        prompt="Write a birthday message in 40 words";
    }
    const result=await model.generateContent(prompt);
    const response=await result.response;
    const text=response.text();
    res.status(200).json(text);
} catch (err) {
    if(err?.status===503){
        res.status(err?.status).json(err?.statusText);
    }
    
        console.error(err);
}
})
module.exports=route;