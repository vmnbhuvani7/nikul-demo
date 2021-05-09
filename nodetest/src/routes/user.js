import express from 'express';
const router = express.Router();

import { userController} from '../controllers';
import { auth } from '../middlewares/auth';

router.get('/all', userController.getUsers)

router
    .post('/signup',userController.signUp)
    .post('/signin', userController.signIn)

router
    .route('/')
    .get(auth, userController.getUser)
    .put(auth, userController.editUser)
 
router
    .route('/:userId')
    .patch(userController.deleteUser)
    
export default router;
