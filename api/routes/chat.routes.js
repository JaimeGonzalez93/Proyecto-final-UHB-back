import express from "express";
import {
    getChatDetail,
    postChatComment,
} from "../controllers/chat.controller.js";

const chatRoutes = express.Router();

chatRoutes.get("/detail/:id", getChatDetail);
chatRoutes.post("/comment/:id", postChatComment);

export { chatRoutes };
