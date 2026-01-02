import Room from '../models/room.model.js';
import cloudinary from '../conifg/cloudinary.js';
import Message from '../models/message.model.js';

export const createRoom = async (req, res) => {
    const { name, roomImg, coordinates } = req.body;
    if(!name && !Array.isArray(coordinates) && coordinates.length !== 2) return res.status(403).json({
        message: "Room name is required!"
    });
    const { _id: userId } = req.user;

    try {
        const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

        let roomImgUrl;
        if(roomImg){
            const roomImgUpload = await cloudinary.uploader.upload(roomImg);
            roomImgUrl = roomImgUpload.secure_url;
        }

        const room = new Room({
            name,
            createdBy: userId,
            expiresAt,
            roomImg: roomImgUrl,
            location: {
                type: "Point",
                coordinates,
            }
        })
        room.createdBy = {
            username : req.user.username,
            _id: req.user._id
        }
        await room.save();

        return res.status(201).json(room);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}
export const deleteRoom = async (req, res) => {
    const { id: roomId } = req.params;
    const userId = req.user._id;
    try {
        const room = await Room.findOne({_id: roomId});
        if(userId.toString() !== room.createdBy.toString()){
            return res.status(403).json({
                message: "Only owner can delete this room!"
            });
        }

        await Room.deleteOne({ _id: roomId })
        await Message.deleteMany({ roomId });
        
        return res.status(201).json({
            message: "Room has been deleted Successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const updateCoords = async (req, res) => {
    
    const { coordinates } = req.body;
    const userId = req.user._id;

    if (
        !coordinates ||
        !Array.isArray(coordinates) ||
        coordinates.length !== 2
      ) {
        return res.status(400).json({
          message: "Coordinates must be [lng, lat]"
        });
      }
    try {
        const rooms = await Room.updateMany(
            { createdBy: userId },
            { $set : {
                "location.coordinates" : coordinates 
            }}
        )
        return res.status(200).json(rooms);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const getRooms = async (req, res) => {
    const { coordinates } = req.body;

    if (
        !coordinates ||
        !Array.isArray(coordinates) ||
        coordinates.length !== 2 ||
        coordinates[0] < -180 || coordinates[0] > 180 ||
        coordinates[1] < -90 || coordinates[1] > 90
    ) {
        return res.status(400).json({ message: "Coordinates must be [lng, lat]" });
    }

    try {
        const rooms = await Room.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates
                    },
                    $maxDistance: 2000
                }
            }
        }).populate("createdBy");

        return res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
export const updateRoom = async (req, res) => {
    
    const { name, roomImg } = req.body;
    const { id } = req.params;
    if(!name && !roomImg){
        return res.status(403).json({
            message: "Name or Room Image is required!"
        })
    }
    if(!id) return res.status(403).json({message: "Room id is required!"})
    try {
        const room = await Room.findById(id);
        if(!room) return res.status(404).json({
            message: "Room not found!"
        });

        let roomImgUrl;
        if(roomImg){
            const cloudinaryUpload = await cloudinary.uploader.upload(roomImg);
            roomImgUrl = cloudinaryUpload.secure_url;
        };

        room.roomImg = roomImgUrl || room.roomImg;
        room.name = name || room.name;
        
        await room.save();

        return res.status(201).json(room);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}