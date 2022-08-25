import { Travel } from "../models/travel.model.js";
import { User } from "../models/user.model.js";

const getUsersList = async (req, res, next) => {
    try {
        const usersList = await User.find();

        res.status(200).json(usersList);
    } catch (error) {
        next(error);
    }
};

const getTravelsList = async (req, res, next) => {
    try {
        const travelList = await Travel.find();

        res.status(200).json(travelList).populate("tags");
    } catch (error) {
        next(error);
    }
};

export { getUsersList, getTravelsList };
