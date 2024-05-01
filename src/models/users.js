import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  hashPassword: String,
});

export const UserModel = mongoose.model("Users", usersSchema);

export const createUserModel = async (user) => {
  const newUser = new UserModel(user);
  return await newUser.save();
};

export const getUserByEmailModel = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};
