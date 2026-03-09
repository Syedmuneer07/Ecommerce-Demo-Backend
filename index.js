const express =require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const cors=require('cors');

const authRoutes=require('./routes/authRoutes');
const categoryRoutes=require('./routes/categoryRoutes');
const productRoutes=require('./routes/productRoutes');
const orderRoutes=require('./routes/orderRoutes');


const app=express();  
app.use(express.json());
const path = require('path');
app.use(cors(
    {
        origin:['http://localhost:5173', 'https://ecommerce-demo-front-end.onrender.com'],//Frontend URL
        credentials:true
    }
));


mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to MongoDB');            
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
}); 

app.use('/api/auth',authRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders', orderRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});