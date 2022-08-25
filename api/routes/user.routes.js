import express from "express";
import { upload, uploadToCloudinary } from "../../middlewares/cloudinary.js";
import {
    getUserDetail,
    postNewTravel,
    postUserToChat,
    putUserInfo,
    postUserImages,
    deleteUsersWantJoin,
    deleteUsersJoined,
    getUserDetailByUsername,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/:id", getUserDetail);
userRoutes.get("/detail/:username", getUserDetailByUsername);
userRoutes.post("/travel/:id", postNewTravel);
userRoutes.post("/chat", postUserToChat);
userRoutes.post(
    "/info/:id",
    [upload.array("img"), uploadToCloudinary],
    putUserInfo
);
userRoutes.post(
    "/images/:id",
    [upload.array("img"), uploadToCloudinary],
    postUserImages
);

userRoutes.delete("/wantjoin", deleteUsersWantJoin);
userRoutes.delete("/joined", deleteUsersJoined);

export { userRoutes };
