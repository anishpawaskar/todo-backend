import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import indexRouter from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
connectDB();

app.use(express.json());
app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
