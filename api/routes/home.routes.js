import express from "express";
import {
    getUsersList,
    getTravelsList,
} from "../controllers/home.controller.js";

const homeRoutes = express.Router();

homeRoutes.get("/users", getUsersList);
homeRoutes.get("/travels", getTravelsList);

export { homeRoutes };
