import express from "express";
import {
  loginUserController,
  registerUsersController,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", loginUserController);
router.post("/register", registerUsersController);

export default router;
