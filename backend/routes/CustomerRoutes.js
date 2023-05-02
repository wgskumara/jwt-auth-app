import express from 'express';
import {register} from '../controller/CustomerControl.js';

const router = express.Router();
 
router.post('/register', register);

export default router;