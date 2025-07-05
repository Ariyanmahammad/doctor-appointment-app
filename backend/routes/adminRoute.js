import express from 'express';
import { addDoctor, appointmentCancel, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { allDoctors } from '../controllers/adminController.js';
import { changeAvailablity} from '../controllers/doctorController.js';
import {appointmentsAdmin, adminDashboard} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('imageFile'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin,changeAvailablity);
adminRouter.get('/appointments', authAdmin,appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin,appointmentCancel);
adminRouter.get('/dashboard', authAdmin,adminDashboard);



export default adminRouter;


