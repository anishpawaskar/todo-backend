import express from "express";
import { createTodoController } from "../controllers/todos.js";

const router = express.Router();

router.post("/", createTodoController);

export default router;
