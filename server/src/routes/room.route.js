import express from 'express';
import { createRoom, deleteRoom, getRooms, updateCoords, updateRoom } from '../controllers/room.controller.js';
import { protectedRoute } from '../middlewares/protectedRoute.js';
const router = express.Router();

router.post('/', protectedRoute, getRooms);
router.post('/update-profile/:id', protectedRoute, updateRoom);
router.post("/create", protectedRoute, createRoom);
router.put("/update-coords", protectedRoute, updateCoords);
router.delete("/:id", protectedRoute, deleteRoom);

export default router;
