import jwt from 'jsonwebtoken';
const generateVerificationToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '7d',
    });
    res.cookie("token", token, {
        httpOnly: true,                                      // JS cannot access this cookie
        secure: process.env.NODE_ENV === 'production',       // HTTPS only in production
        sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax", // relax in dev
        maxAge: 7 * 24 * 60 * 60 * 1000,                    // 7 days in ms
        path: "/",                                           // cookie accessible across whole site
      });
}
export default generateVerificationToken;