import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const generateToken = (payload: string) => jwt.sign(payload, JWT_SECRET);
