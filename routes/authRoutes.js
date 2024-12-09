import express from "express";
import { editUser, getUser, registerUser } from "../controller/userContoller.js";
import { logoutUser, logUser } from "../controller/authController.js";
import { authorization } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes related to auth and users
router.post("/createuser", registerUser);                               // User registration
router.post("/login", logUser);
router.post("/userdata", authorization, getUser);
router.post("/logout", authorization, logoutUser);
router.put("/edituser", authorization, editUser);

export default router;
