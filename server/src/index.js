import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import path from 'path';
import { app, server } from './socket/socket.js';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route Imports

import AuthRoutes from './routes/auth.route.js';
import MessageRoutes from './routes/message.route.js';
import RoomRoutes from './routes/room.route.js';

// Middlewares

const PORT = process.env.PORT || 4000;

app.use(express.json({limit: '10mb'}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
    ? true
    : ['http://localhost:5173'],
  credentials: true
}))

// PORTS

app.use('/api/auth', AuthRoutes);
app.use('/api/message', MessageRoutes);
app.use('/api/room', RoomRoutes);

// Frontend

app.use(express.static(path.join(__dirname, '../../client/dist')));
app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, '../../client/dist', 'index.html')))



// Listener

connectDb()
.then(() => {
    server.listen(PORT, () => console.log(`Server is running at PORT : ${PORT}`));
})

