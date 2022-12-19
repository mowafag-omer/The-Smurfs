import jwt from "jsonwebtoken";
import config from "../config/constants";

export function generateToken(userData: object) {
  console.log('====================================');
  console.log(userData);
  console.log('====================================');
  return jwt.sign(
    userData,
    config.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

export function verifyToken(token: any) {
  return jwt.verify(token, config.JWT_SECRET)
}
