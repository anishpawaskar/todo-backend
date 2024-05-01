import express from "express";
import authRoute from "./auth.js";

const app = express.Router();

app.use("/auth", authRoute);

export default app;
