import express from "express";
import { authorization } from "../middleware/authMiddleware.js";
import { createReminder, deleteReminder, editReminder, getReminder } from "../controller/reminderContoller.js";

const router = express.Router()

// routes related to reminders
router.post("/createreminder", authorization, createReminder);
router.post("/getreminder", authorization, getReminder);
router.post("/editreminder", authorization, editReminder);
router.post("/deletereminder", authorization, deleteReminder);


export default router;