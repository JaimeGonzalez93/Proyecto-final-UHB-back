import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
});

const Tag = mongoose.model("Tag", tagSchema);

export { Tag };
