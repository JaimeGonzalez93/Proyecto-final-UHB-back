import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    surname: { type: String },
    age: { type: Number },
    avatar: { type: String },
    sex: { type: String },
    bio: { type: String },
    location: { type: String },
    valoration: { type: Number },
    images: [
        {
            type: String,
        },
    ],
    preferences: [
        {
            type: String,
        },
    ],
    travelsFollowing: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Travel",
        },
    ],
    travelsJoined: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Travel",
        },
    ],
    travelsCreated: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Travel",
        },
    ],
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.password;
        delete returnedObject.email;
    },
});

const User = mongoose.model("User", userSchema);

export { User };
