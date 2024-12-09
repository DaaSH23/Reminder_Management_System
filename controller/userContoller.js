import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { User } from "../models/users.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

// new user registration
const registerUser = catchAsyncError(async (req, res, next) => {
    try {

        const { userName, userEmail, password } = req.body;

        // Null Exception
        if (!userName || !userEmail || !password)
            return next(new ErrorHandler("Please enter all required field", 400));

        //Check if User Already exists or not
        let userE = await User.findOne({ userEmail });
        if (userE)
            return next(new ErrorHandler("User Already exist", 403));

        //Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a newUser Object
        const userData = {
            userId: uuidv4(),
            userName,
            userEmail,
            password: hashedPassword,
            // createdAt: createdAt || new Date(),
        };

        // console.log(userData);
        const newUser = await User.create(userData);
        let user = new User(newUser);

        await user.save();

        res.status(200).json({
            status: "success",
            data: [userData],
            message: "Thank You for Registering, your account has been created successfully."
        });
    } catch (error) {
        console.error("Error saving user:", error);
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
});


// Edit registered user
const editUser = catchAsyncError(async (req, res, next) => {

    const userId = req.user.userId;
    const { userName, userEmail } = req.body;

    try {

        // Checking if user exists and updating it
        const user = await User.findOneAndUpdate(
            { userId: userId },
            { userName, userEmail, updatedAt: new Date() },
            { new: true }
        );
        if (!user) return next(new ErrorHandler("User not found", 404));

        res.status(200).json({
            status: "success",
            data: [user],
            message: "User profile updated successfully."
        });
    } catch (error) {
        // console.error("Error editing user:", error);
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
});

// get all or single user
const getUser = catchAsyncError(async (req, res, next) => {
    try {
        const {userName, userEmail, limit, page } = req.body;
        const userId = req.user.userId;         // can implement role for admin to see all data
                                                // by removing the userId and make it null 

        const query = {
            ...(userId ? { userId } : {}),
            ...(userName ? { userName } : {}),
            ...(userEmail ? { userEmail } : {})
        };

        // Total user count
        const totalUserCount = await User.countDocuments(query);

        // User data pagination
        const userData = await User.find(query).limit(Number(limit)).skip(Number(limit) * (Number(page) - 1));

        if (userData.length === 0) return next(new ErrorHandler("No user found", 404));

        // Total page
        const totalPages = Math.ceil(totalUserCount / Number(limit));

        res.status(200).json({
            status: "success",
            data: userData,
            pagination: {
                totalUsers: totalUserCount,
                currentPage: Number(page),
                pageSize: (Number(limit) > totalUserCount ? totalUserCount : Number(limit)),
                totalPages: totalPages,
            },
            message: "User fetched successfully",
        });

    } catch (err) {
        console.log("Error: Something went wrong, error - ", err);
        next(new ErrorHandler(err.message || "Internal server error", 500))
    }
})

export { registerUser, editUser, getUser }