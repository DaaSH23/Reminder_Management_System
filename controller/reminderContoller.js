import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Reminder } from "../models/reminder.js";
import ErrorHandler from "../utils/errorHandler.js";
import { v4 as uuidv4 } from "uuid";

// Create reminder
const createReminder = catchAsyncError(async (req, res, next) => {
    try {
        const { message, time, recurrence } = req.body;

        if (!message, !time) {
            return next(new ErrorHandler("Please provide all the required fields", 400));
        }

        const newReminder = new Reminder({
            userId: req.user.userId,
            reminderId: uuidv4(),
            message,
            time,
            recurrence
        });
        await newReminder.save();
        res.status(200).json({
            status: "success",
            data: newReminder,
            message: "Reminder saved successfuly.",
        });
    } catch (error) {
        console.error("Error creating reminder: ", error);
        next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
});

// fetch all the reminder by userId
const getReminder = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { status, recurrence, time, limit, page } = req.body;

        const query = {
            ...(userId ? { userId } : {}),
            ...(status ? { status } : {}),
            ...(recurrence ? { recurrence } : {}),
            ...(time ? { time } : {})
        };

        // Total user count
        const totalReminderCount = await Reminder.countDocuments(query);

        // User data
        const reminderData = await Reminder.find(query).limit(Number(limit)).skip(Number(limit) * (Number(page) - 1));

        if (reminderData.length === 0) return next(new ErrorHandler("No reminder found", 404));

        // Total page
        const totalPages = Math.ceil(totalReminderCount / Number(limit));

        res.status(200).json({
            status: "success",
            data: reminderData,
            pagination: {
                totalUsers: totalReminderCount,
                currentPage: Number(page),
                pageSize: (Number(limit) > totalReminderCount ? totalReminderCount : Number(limit)),
                totalPages: totalPages,
            },
            message: "Reminder fetched successfully",
        });


    } catch (error) {
        console.error("Error fetching reminder: ", error);
        next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
});

// Edit reminder by reminder Id
const editReminder = catchAsyncError(async (req, res, next) => {

    const { reminderId, message, time, recurrence } = req.body;
    if(!reminderId) return next(new ErrorHandler("reminderId is required", 401));

    try {
        const reminderData = await Reminder.findOneAndUpdate(
            { reminderId: reminderId, userId: req.user.userId },
            { message, time, recurrence, updatedAt: new Date() },
            { new: true }
        );
        if (!reminderData) return next(new ErrorHandler("Reminder not found", 404));

        res.status(200).json({
            status: "success",
            data: [reminderData],
            message: "Reminder updated successfuly."
        });


    } catch (error) {
        console.error("Error updating reminder: ", error);
        next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
});

// Delete reminder by reminder Id
const deleteReminder = catchAsyncError(async(req, res, next) => {
    const {reminderId} = req.body;
    if(!reminderId) return next(new ErrorHandler("reminderId is required", 401));

    try{
        const reminder = await Reminder.findOneAndDelete({
            reminderId: reminderId,
            userId: req.user.userId,
        });

        if(!reminder) return next(new ErrorHandler("Error, Reminder not found", 404));

        res.status(200).json({
            status: "success",
            data: [reminder],
            message: "Reminder deleted successfuly.",
        });
    }catch(error){
        console.error("Error deleting reminder: ", error);
        next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
})


export {createReminder, getReminder, editReminder, deleteReminder}