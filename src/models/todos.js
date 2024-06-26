import mongoose from "mongoose";

const todosSchema = mongoose.Schema({
  title: String,
  content: String,
  state: {
    isDeleted: Boolean,
  },
  createdAt: String,
  updatedAt: String,
});

export const TodoModel = mongoose.model("Todos", todosSchema);

export const createTodoModel = async (todo) => {
  const newTodo = new TodoModel(todo);
  return await newTodo.save();
};
