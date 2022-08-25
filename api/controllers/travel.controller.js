import { City } from "../models/city.model.js";
import { Tag } from "../models/tag.model.js";
import { Travel } from "../models/travel.model.js";
import { User } from "../models/user.model.js";

const getTravelDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const travel = await Travel.findOne({ id: id })
            .populate("tags")
            .populate("chat")
            .populate("usersFollowing")
            .populate("usersWantJoin");

        res.status(200).json(travel);
    } catch (error) {
        next(error);
    }
};

const getCities = async (req, res, next) => {
    try {
        const cities = await City.find();

        res.status(200).json(cities).populate("tags");
    } catch (error) {
        next(error);
    }
};

const getTags = async (req, res, next) => {
    try {
        const tags = await Tag.find();

        res.status(200).json(tags);
    } catch (error) {
        next(error);
    }
};

const postUserFollow = async (req, res, next) => {
    try {
        const { userName, travelId } = req.body;

        const user = await User.findOne({ username: userName });
        const travel = await Travel.findOne({ id: travelId });

        await Travel.findOneAndUpdate(
            { id: travelId },
            { $push: { usersFollowing: user } }
        );

        await User.findOneAndUpdate(
            { username: userName },
            { $push: { travelsFollowing: travel } }
        );

        const travelUpdate = await Travel.findOne({ id: travelId })
            .populate("tags")
            .populate("chat")
            .populate("usersFollowing")
            .populate("usersWantJoin");

        res.status(200).json(travelUpdate);
    } catch (error) {
        next(error);
    }
};

const postUserJoin = async (req, res, next) => {
    try {
        const { userName, travelId } = req.body;

        const user = await User.findOne({ username: userName });

        await Travel.findOneAndUpdate(
            { id: travelId },
            { $push: { usersWantJoin: user } }
        );

        const travelUpdate = await Travel.findOne({ id: travelId })
            .populate("tags")
            .populate("chat")
            .populate("usersFollowing")
            .populate("usersWantJoin");

        res.status(200).json(travelUpdate);
    } catch (error) {
        next(error);
    }
};

const deleteFollow = async (req, res, next) => {
    try {
        const { userName, travelId } = req.body;

        const user = await User.findOne({ username: userName });
        const travel = await Travel.findOne({ id: travelId });

        //Control de error
        if (!travel.usersFollowing.includes(user._id)) {
            const error = "This user isn't following this travel";
            return res.send(error);
        }

        await Travel.findOneAndUpdate(
            { id: travelId },
            { $pull: { usersFollowing: user } }
        );

        await User.findOneAndUpdate(
            { username: userName },
            { $pull: { travelsFollowing: travel } }
        );

        const travelUpdate = await Travel.findOne({ id: travelId });

        res.status(200).json(travelUpdate);
    } catch (error) {
        next(error);
    }
};

export {
    getTravelDetail,
    postUserFollow,
    postUserJoin,
    getCities,
    getTags,
    deleteFollow,
};
