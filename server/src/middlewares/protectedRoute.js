import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const protectedRoute = async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) return res.status(403).json({
        message: "Not Authorized!"
    });

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!decodedToken) return res.status(403).json({
            message: "Not Authorized!"
        });

        const { userId } = decodedToken;
        const user = await User.findById(userId).select("-password");
        if(!user) return res.status(404).json({
            message: "User not found!"
        })
        
        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}