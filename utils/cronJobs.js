import cron from "node-cron";
import { Reminder } from "../models/reminder.js";

cron.schedule('* * * * *', async () => {
    const now = new Date();

    try {
        const reminders = await Reminder.find({
            status: 'pending',
            time: { $lte: now },
        });

        if (reminders.length === 0) {
            console.log('No pending reminders found.');
            return;
        }

        reminders.forEach(async (reminder) => {
            console.log(`Reminder: ${reminder.message}`);
            reminder.status = 'triggered';
            await reminder.save();
        });
    } catch (error) {
        console.error('Error processing reminders:', err.message);
    }
});

export default cron;