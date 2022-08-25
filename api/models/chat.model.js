import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    id: { type: Number, required: true },
    travelId: { type: Number, required: true },
    owner: [
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
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
        },
    ],
});

const Chat = mongoose.model("Chat", chatSchema);

export { Chat };
