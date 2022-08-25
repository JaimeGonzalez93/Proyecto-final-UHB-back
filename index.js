import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { connect } from "./config/dbconnect.js";
import { authRoutes } from "./api/routes/auth.routes.js";
import { userRoutes } from "./api/routes/user.routes.js";
import { homeRoutes } from "./api/routes/home.routes.js";
import { travelRoutes } from "./api/routes/travel.routes.js";
import { chatRoutes } from "./api/routes/chat.routes.js";

// Configuration
dotenv.config();
const app = express();
const router = express.Router();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

// app uses
app.use("/", router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: `*`,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000,
        },
        store: MongoStore.create({
            mongoUrl: DB_URL,
        }),
    })
);

// Routes
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/home", homeRoutes);
app.use("/travel", travelRoutes);
app.use("/chat", chatRoutes);

//Errors
app.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    return res
        .status(error.status || 500)
        .json(error.message || "Unexpected error");
});

// Listen server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

//JWT
app.set("secretKey", "nodeRestApi");
