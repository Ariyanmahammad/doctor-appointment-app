import dotenv from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import adminRouter from './routes/adminRoute.js';


//db config
import connectDB from './config/mongodb.js';

import connectCloudinary from './config/cloudinary.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoutes.js';

//app config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

//middlewares
app.use(cors());
app.use(express.json());

//api endpoints
app.use('/api/admin', adminRouter);
//localhost:4000/api/admin

app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);




app.get('/', (req, res) => {
    res.send('API is working Great');
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




//5.45 hr