import { catchAsyncError } from "../middleware/catchAsyncError.js";
import blackList from "../models/blackList.js";
import { User } from "../models/users.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

// Login user credentials
const logUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler("All fields are not provided", 400));

    // checking if the user is already logged in or not
    const existingToken = req.cookies.access_token;
    if (existingToken) {
        try {
            Jwt.verify(existingToken, process.env.JWT_SECRET_KEY);
            return next(new ErrorHandler("User already logged in, Please logout first.", 403));
        } catch (err) {
            console.log("Existing token invalid, allowing login.");
        }
    }

    try {
        // Find user by email
        const user = await User.findOne({ userEmail: email });
        if (!user) return next(new ErrorHandler("Wrong email or password !", 401));

        // check the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return next(new ErrorHandler("Wrong email or password !", 401));

        const token = Jwt.sign(
            {  // payload
                userId: user.userId,
                userEmail: user.userEmail,
                userName: user.userName,

            },
            process.env.JWT_SECRET_KEY,   //signature
            { expiresIn: "24h" }
        );

        const userData = {
            userId: user.userId,
            userEmail: user.userEmail,
            userName: user.userName,
        }

        res.cookie("access_token", token, {
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiry (24 hours)
        })
        res.status(200).json({
            status: "success",
            data: userData,
            token: token,
            message: "Login Successful",
        });
    } catch (err) {
        console.error("Error Login user: ", err);
        next(new ErrorHandler(err.message || "Internal Server Error", 500));
    }
});

// Logout user
const logoutUser = catchAsyncError(async (req, res, next) => {

    try {
        const token = req.user.token;
        // blacklist the token
        const newBlackList = new blackList({
            token: token,
        });

        await newBlackList.save();

        // Clear the token cookie
        res.clearCookie('access_token', {
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production', // Ensure secure in production
            sameSite: 'strict',
        });

        res.status(200).json({
            status: "success",
            message: "You are successfully logged out",
        });

    } catch (err) {
        console.log("Error: ", err);
        next(new ErrorHandler(err.message || "Internal server error", 500));
    }
    res.end();
})


export { logUser, logoutUser };