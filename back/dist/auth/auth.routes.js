"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authMiddleware_1 = require("./authMiddleware");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
router.get("/profile", authMiddleware_1.authenticate, auth_controller_1.getProfile); // ✅ Ruta protegida
exports.default = router;
