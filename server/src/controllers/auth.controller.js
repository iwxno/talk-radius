import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateVerificationToken from '../libs/generateVerificationToken.js';

export const signup = async (req, res) => {
    
    const { username, password } = req.body;
    if(!username || !password) return res.status(403).json({
        message: "All fields are required!"
    })
    
    try {

        const isExists = await User.findOne({username});
        if(isExists) return res.status(403).json({
            message: "User Already Exists"
        })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hashedPassword
        });
        
        await user.save();
        delete user._doc.password;

        generateVerificationToken(user._id, res);        
        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const login = async (req, res) => {

    const { username, password } = req.body;
    if(!username || !password) return res.status(403).json({
        message: "All fields are required!"
    })
    try {
        const user = await User.findOne({ username });
        if(!user) return res.status(403).json({
            message: "Invalid username"
        });

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) return res.status(200).json({
            message: "Invalid Password!"
        });
        delete user._doc.password;

        generateVerificationToken(user._id, res);
        return res.status(200).json(user);
    } catch (error) {   
        return res.status(500).json({
            message: error.message
        })
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message: "Logged out successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const getAuthUser = async (req, res) => {
    try {
        const userId = await req.user._id;
        const user = await User.findById(userId).select("-password");
        if(!user) return res.status(404).json({
            message: "User not found!"
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}