import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"] 
  } 
});


io.on("connection", (socket) => {
  console.log(socket.id + " Connected");

  socket.on("join-room", room => {
    socket.join(room._id);
    console.log("Connected to room " + room._id)
  })

  socket.on("disconnect", () => {
    console.log(socket.id + " Disconnected")
  })
  
})

export {app, server, io}