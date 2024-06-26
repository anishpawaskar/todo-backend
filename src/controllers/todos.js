import { createTodoModel } from "../models/todos.js";

export const createTodoController = async (req, res) => {
  try {
    const timeStamp = Date.now();
    const body = {
      ...req.body,
      createdAt: timeStamp,
      updatedAt: timeStamp,
    };
    const todo = await createTodoModel(body);

    return res
      .status(201)
      .json({ message: "Todo created successfully!", todo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
