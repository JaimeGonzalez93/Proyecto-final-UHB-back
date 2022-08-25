import mongoose from "mongoose";

const Schema = mongoose.Schema;

const travelSchema = new Schema({
    id: { type: Number, required: true },
    userOwnerId: { type: String, required: true }, // User value
    cityName: { type: String, required: true }, // Api value
    cityDescription: { type: String, required: true }, // Api value
    images: [
        {
            type: String,
            required: true,
        },
    ], // Api value
    tags: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Tag",
        },
    ], // Api value
    title: { type: String, required: true }, // User value
    description: { type: String, required: true }, // User value
    dataFrom: { type: String, required: true }, // User value
    dataTo: { type: String, required: true }, // User value
    budget: { type: Number, required: true }, // User value
    usersFollowing: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
    usersWantJoin: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
    usersJoined: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
    chat: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Chat",
        },
    ],
});

const Travel = mongoose.model("Travel", travelSchema);

export { Travel };
