import express from "express";
import {
    getTravelDetail,
    postUserFollow,
    postUserJoin,
    getCities,
    getTags,
    deleteFollow,
} from "../controllers/travel.controller.js";

const travelRoutes = express.Router();

travelRoutes.get("/detail/:id", getTravelDetail);
travelRoutes.get("/cities", getCities);
travelRoutes.get("/tags", getTags);
travelRoutes.post("/follow", postUserFollow);
travelRoutes.post("/join", postUserJoin);
travelRoutes.delete("/follow", deleteFollow);

export { travelRoutes };
