import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  res.send("helo");
});

export default router;
