import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "UserId is required!"],
        index: { unique: true, message: "userId already exists !"},
    },
    userEmail: {
        type: String,
        required: [true, "Email must be provided !"],
        index: { unique: true, message: "Email is already registered !"},
    },
    userName: {
        type: String,
        required: [true, "username is required!"],
        max: 30,
    },
    password: {
        type: String,
        required: [true, "Password must be provided."],
        select: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: null,
    }
});

export const User = mongoose.model("users", userSchema);