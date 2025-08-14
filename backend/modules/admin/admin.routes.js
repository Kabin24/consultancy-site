import express from 'express';
import { login, verifyToken } from './auth.controller.js';
import { auth } from '../../middleware/auth.middleware.js';

const router = express.Router();


router.post('/login', login);
router.get('/verify', auth, verifyToken);

export default router;
