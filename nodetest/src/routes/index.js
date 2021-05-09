import express from 'express';
const router = express.Router();

import userRoutes from './user';
import companyRoutes from './company';

router.use('/user', userRoutes);
router.use('/company', companyRoutes);


export default router;