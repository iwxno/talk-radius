import express from 'express';
import { protectedRoute } from '../middlewares/protectedRoute.js'
import { createMessage, getMessages } from '../controllers/message.controller.js';
const router = express.Router();

router.get("/get/:id", protectedRoute, getMessages);
router.post('/send/:id', protectedRoute, createMessage);

export default router;