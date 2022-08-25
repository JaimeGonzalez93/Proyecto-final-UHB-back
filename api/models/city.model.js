import mongoose from "mongoose";

const Schema = mongoose.Schema;

const citySchema = new Schema({
    id: { type: Number, required: true },
    cityName: { type: String, required: true },
    description: { type: String, required: true },
    images: [
        {
            type: String,
            required: true,
        },
    ],
});

const City = mongoose.model("City", citySchema);

export { City };
