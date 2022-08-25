import mongoose from "mongoose";
import dotenv from "dotenv";
import { citiesData, tagsData } from "./data.js";
import { City } from "../api/models/city.model.js";
import { Tag } from "../api/models/tag.model.js";

dotenv.config();
const DB_URL = process.env.DB_URL;

// Create documents with the data info
const citiesDoc = citiesData.map((element) => new City(element));
const tagsDoc = tagsData.map((element) => new Tag(element));

// Function to create collections and drop/remove collections if it already exists
const createCollections = async () => {
    const oldCities = await City.find({});
    oldCities && (await City.collection.drop());

    const oldTags = await Tag.find({});
    oldTags && (await Tag.collection.drop());

    await City.insertMany(citiesDoc);
    await Tag.insertMany(tagsDoc);
};

const creationSeed = mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        await createCollections();
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        console.log("Seed created successfully");
        mongoose.disconnect();
    });
