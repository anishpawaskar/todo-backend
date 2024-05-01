import express from "express";
import { registerUsersController } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUsersController);

export default router;
