import { createUserModel, getUserByEmailModel } from "../models/users.js";
import { compareHash, generateHash, generateJWT } from "../utils/auth.js";

export const registerUsersController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const findUserByEmail = await getUserByEmailModel(email);

    if (findUserByEmail) {
      return res.status(409).json({ message: "Email already in use." });
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
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUserByEmail = await getUserByEmailModel(email);

    if (!findUserByEmail) {
      return res.status(400).json({ message: "Email or password is invalid." });
    }

    const validateHashPassword = await compareHash(
      password,
      findUserByEmail.hashPassword
    );

    if (!validateHashPassword) {
      return res.status(400).json({ message: "Email or password is invalid." });
    }

    const payload = {
      id: findUserByEmail._id,
      firstName: findUserByEmail.firstName,
      lastName: findUserByEmail.lastName,
      email: findUserByEmail.email,
    };

    const token = generateJWT(payload);
    res.cookie("notekar-session", token, { httpOnly: true });

    return res.status(200).json({
      message: "User logged in successfully!",
      user: payload,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
