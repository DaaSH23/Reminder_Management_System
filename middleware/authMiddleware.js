import blackList from "../models/blackList.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import Jwt from "jsonwebtoken";


export const authorization = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(new ErrorHandler("Logged out, please login! ", 403));

    try {
        // checking for blacklist token
        const Blacklist = await blackList.findOne({ token });
        if (Blacklist) return next(new ErrorHandler("Your are logged out, please login to continue", 401))

        // verifying token
        const data = Jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!data) return next(new ErrorHandler("Error Authorizing", 401));
        req.user = {
            userId: data.userId,
            userName: data.userName,
        };
        req.token = token;
        // req.token = token;
        next();
    } catch (error) {
        next(new ErrorHandler(err.message || "Internal server error", 500));
    }
})