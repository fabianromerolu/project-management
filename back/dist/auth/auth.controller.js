"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.getProfile = void 0;
const auth_service_1 = require("./auth.service");
const getProfile = async (req, res) => {
    res.json({ user: req.user });
};
exports.getProfile = getProfile;
const register = async (req, res) => {
    try {
        const user = await (0, auth_service_1.registerUser)(req.body);
        res.status(201).json({ user });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, refreshToken, user } = await (0, auth_service_1.loginUser)(email, password);
        res.json({ token, refreshToken, user });
    }
    catch (err) {
        res.status(401).json({ error: err.message });
    }
};
exports.login = login;
