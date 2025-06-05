// backend/routes/userRoutes.js
import express from "express";
import { syncUserToDB } from "../controllers/userController.js";

const router = express.Router();

router.post("/sync-user", syncUserToDB);

export default router;
