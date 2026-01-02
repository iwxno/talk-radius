import Message from '../models/message.model.js'
import cloudinary from '../conifg/cloudinary.js';
import Room from '../models/room.model.js'
import { io } from '../socket/socket.js';

// Modify these routes later

export const createMessage = async (req, res) => {
        
        const { text, image } = req.body;
        const roomId = req.params.id;
        const userId = req.user._id;
        if(!roomId || !text && !image) return res.status(403).json({
            message: "Text or Image is required!"
        });

        try {

            const room = await Room.findById(roomId);
            if(!room) return res.status(404).json({
                message: "Room not found!"
            })

            let imageUrl;

            const now = new Date();
            const remainingMs = room.expiresAt - now;
            const remainingSeconds = Math.floor(remainingMs / 1000);

            // Convert remainingSeconds to a Unix timestamp
            const expireAtUnix = Math.floor(Date.now() / 1000) + remainingSeconds;

            if (image) {
                const cloudinaryUpload = await cloudinary.uploader.upload(image, {
                    folder: 'chat-images',
                    expire_at: expireAtUnix // <-- must be a timestamp, not duration
                });

                imageUrl = cloudinaryUpload.secure_url;
            }
            
            const message = new Message({
                text,
                image: imageUrl,
                from: userId,
                roomId,
                expiresAt: room.expiresAt
            })
            await message.save();
            
            message._doc.from = {
                _id: userId,
                username: req.user.username
            };
            io.to(roomId).emit("message" , message);

            return res.status(201).json(message);

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    } 
export const getMessages = async (req, res) => {
    const { id: roomId } = req.params;
    const { _id: userId } = req.user;

    if(!roomId) return res.status(403).json({
        message: "Room Id is required!"
    });

    try {
        const messages = await Message.find({
            roomId
        }).populate({
            path: "from",
            select: "-password"
        });
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}