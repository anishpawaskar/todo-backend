import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateHash = async (password) => {
  const saltRounds = process.env.HASH_SALT_ROUNDS;
  try {
    return bcrypt.hash(password, Number(saltRounds));
  } catch (err) {
    console.error(err);
  }
};

export const compareHash = async (password, hashPassword) => {
  try {
    return bcrypt.compare(password, hashPassword);
  } catch (err) {
    console.error(err);
  }
};

export const generateJWT = (payload) => {
  const privateKey = process.env.JWT_PRIVATE_KEY;
  try {
    const token = jwt.sign({ ...payload }, privateKey, {
      expiresIn: "5h",
    });
    return token;
  } catch (err) {
    console.error(err);
  }
};
