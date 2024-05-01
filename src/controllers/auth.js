import { createUserModel, getUserByEmailModel } from "../models/users.js";
import { generateHash, generateJWT } from "../utils/auth.js";

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
      hashPassword: await generateHash(password),
    });

    const payload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const token = generateJWT(payload);
    console.log("token", token);
    res.cookie("notekar-session", token, { httpOnly: true });

    return res.status(201).json({
      message: "User registered successfully",
      user: payload,
    });
  } catch (err) {
    console.error(err);
  }
};
