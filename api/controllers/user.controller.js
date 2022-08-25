import { Chat } from "../models/chat.model.js";
import { City } from "../models/city.model.js";
import { Tag } from "../models/tag.model.js";
import { Travel } from "../models/travel.model.js";
import { User } from "../models/user.model.js";

const getUserDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .populate("travelsCreated")
            .populate("travelsJoined")
            .populate("travelsFollowing");

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const getUserDetailByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username: username })
            .populate("travelsCreated")
            .populate("travelsJoined")
            .populate("travelsFollowing");

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Endpoint create travel and chat
const postNewTravel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, dateFrom, dateTo, budget, cityName, tags } =
            req.body;

        const city = await City.findOne({ cityName: cityName });

        // Create an array of tags
        const tagsList = await Tag.find({ title: tags });

        // Create a public id manually
        const travels = await Travel.find({});
        const travelId = travels ? travels.length + 1 : 1;

        // Create new travel with the info from the user
        const newTravel = new Travel({
            id: travelId,
            userOwnerId: id,
            cityDescription: city.description,
            cityName: city.cityName,
            images: city.images,
            city: city,
            tags: tagsList,
            title: title,
            description: description,
            dataFrom: dateFrom,
            dataTo: dateTo,
            budget: budget,
            following: [],
            wantJoin: [],
            chat: [],
        });

        await newTravel.save();

        // Create chat id manually
        const chats = await Chat.find({});
        const chatId = chats ? chats.length + 1 : 1;

        // Find the owner of the chat
        const owner = await User.findById(id);

        // Create chat
        const newChat = new Chat({
            id: chatId,
            travelId: travelId,
            owner: owner,
            usersJoined: [],
            comments: [],
        });

        await newChat.save();

        const chatCreated = await Chat.findOne({ id: chatId });

        // Push new chat to travel
        await Travel.findOneAndUpdate(
            { id: travelId },
            {
                $push: {
                    chat: chatCreated,
                },
            }
        );

        // Push new chat to travel
        await User.findByIdAndUpdate(id, {
            $push: {
                travelsCreated: newTravel,
            },
        });

        const travelCreated = await Travel.findOne({ id: travelId })
            .populate("tags")
            .populate("chat");

        res.status(200).json(travelCreated);
    } catch (error) {
        next(error);
    }
};

// Endpoint push user to chat
const postUserToChat = async (req, res, next) => {
    try {
        const { username, travelId } = req.body;

        const userJoined = await User.findOne({ username: username });

        const travel = await Travel.findOne({ id: travelId });

        // Control de usuario ya añadido a chat
        if (travel.usersJoined.includes(userJoined._id)) {
            const error = "The user is already joined";
            return res.send(error);
        }

        // Push user to chat
        const travelUpdated = await Travel.findOneAndUpdate(
            { id: travelId },
            {
                $push: {
                    usersJoined: userJoined,
                },
            }
        );

        const travelFinal = await Travel.findOne({ id: travelUpdated.id }).populate(
            "usersJoined"
        );

        res.status(200).json(travelFinal);
    } catch (error) {
        next(error);
    }
};

const putUserInfo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userBody = req.body;
        const image = req.files_url ? req.files_url[0] : undefined;

        const currentUser = await User.findById(id);

        await User.findByIdAndUpdate(id, {
            ...userBody,
            avatar: image ? image : currentUser.avatar,
        });

        const updatedUser = await User.findById(id)
            .populate("travelsCreated")
            .populate("travelsJoined")
            .populate("travelsFollowing");

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

const postUserImages = async (req, res, next) => {
    try {
        const { id } = req.params;
        const images = req.files_url;

        // Control de maximo numero de imagenes por usuario permitidas
        const maximumImages = 3;
        if (images.length > maximumImages) {
            const error = `Maximum ${maximumImages} images`;
            return res.send(error);
        }

        await User.findByIdAndUpdate(id, {
            images: images,
        });

        const userUpdated = await User.findById(id)
            .populate("travelsCreated")
            .populate("travelsJoined")
            .populate("travelsFollowing");

        res.status(200).send(userUpdated);
    } catch (error) {
        next(error);
    }
};

const deleteUsersWantJoin = async (req, res, next) => {
    try {
        const { userName, travelId } = req.body;

        const user = await User.findOne({ username: userName });
        const travel = await Travel.findOne({ id: travelId });

        //Control de error
        if (!travel.usersWantJoin.includes(user._id)) {
            const error = "This user isn't joined to this travel";
            return res.send(error);
        }

        await Travel.findOneAndUpdate(
            { id: travelId },
            { $pull: { usersWantJoin: user } }
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

const deleteUsersJoined = async (req, res, next) => {
    try {
        const { userName, travelId } = req.body;

        const user = await User.findOne({ username: userName });
        const chat = await Chat.findOne({ travelId: travelId });

        //Control de error
        if (!chat.usersJoined.includes(user._id)) {
            const error = "This user isn't joined to this travel";
            return res.send(error);
        }

        await Chat.findOneAndUpdate(
            { travelId: travelId },
            { $pull: { usersJoined: user } }
        );

        const chatUpdate = await Chat.findOne({ travelId: travelId });

        res.status(200).json(chatUpdate);
    } catch (error) {
        next(error);
    }
};

export {
    getUserDetail,
    postNewTravel,
    postUserToChat,
    putUserInfo,
    postUserImages,
    deleteUsersWantJoin,
    deleteUsersJoined,
    getUserDetailByUsername,
};
