import express from "express";

import {
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

//Ruta de registro
authRoutes.post("/register", registerUser);

//Ruta de logueo
authRoutes.post("/login", loginUser);

// Ruta de logout
authRoutes.post("/logout", logoutUser);

export { authRoutes };
