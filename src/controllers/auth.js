import { createUserModel, getUserByEmailModel } from "../models/users.js";

export const registerUsersController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const findUserByEmail = await getUserByEmailModel(email);

    if (findUserByEmail) {
      return res.status(409).json({ message: "Email is already being used!" });
    }

    const user = await createUserModel({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
