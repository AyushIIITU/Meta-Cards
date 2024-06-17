const express=require('express');
const bodyParser=require('body-parser');
const db=require('./db');
const userRoutes=require('./routes/userRoutes');
const aiRoutes=require('./routes/aiRoutes');
const cakeRoutes=require('./routes/cakeRoutes');
const path = require("path");
const app=express();
const cors=require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const PORT=process.env.PORT||3000;
app.get("/",(req,res)=>{
    res.send("Server is ok");
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/ai',aiRoutes);
app.use('/api/user',userRoutes);
app.use('/api/cake',cakeRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})