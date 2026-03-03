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
app.use(cors());


mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to MongoDB');            
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
}); 

app.use('/api/auth',authRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
