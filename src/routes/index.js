import express from "express";
import authRoute from "./auth.js";
import todosRoute from "./todos.js";

const app = express.Router();

app.use("/auth", authRoute);
app.use("/todos", todosRoute);

export default app;
