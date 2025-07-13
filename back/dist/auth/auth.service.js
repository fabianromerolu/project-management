"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const registerUser = async (data) => {
    const { name, email, password, role } = data;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
        throw new Error("El usuario ya existe");
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        },
    });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("Credenciales inválidas");
    const valid = await bcrypt_1.default.compare(password, user.password);
    if (!valid)
        throw new Error("Credenciales inválidas");
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, jwtSecret, {
        expiresIn: process.env.TOKEN_EXPIRATION || "15m"
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, refreshSecret, {
        expiresIn: process.env.REFRESH_EXPIRATION || "7d"
    });
    return { token, refreshToken, user };
};
exports.loginUser = loginUser;
