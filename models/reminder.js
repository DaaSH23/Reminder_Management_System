import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: [true, "userId must be provided"],
    },
    reminderId: {
        type: String,
        required: [true, "ReminderId must be provided"],
    },
    message: {
        type: String,
        require: [true, "Message must be provided"],
        max: 100,
    },
    time: {
        type: Date,
        required: [true, "Time must be provided"],
    },
    recurrence: {
        type: String, // "daily", "weekly", "monthly"
        default: null,
    },
    status: {
        type: String,
        enum: ['pending', 'triggered'],
        default: 'pending',
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

export const Reminder = mongoose.model('Reminder', reminderSchema);