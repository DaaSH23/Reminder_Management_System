import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import ErrorMiddleware from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/dbConnection.js";
import cookieParser from "cookie-parser";
import './utils/cronJobs.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api", authRoutes, reminderRoutes);
app.use(ErrorMiddleware);

connectDB();
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    // console.log("time: ", new Date().toISOString());
});
