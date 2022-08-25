import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

const getChatDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const chat = await Chat.findOne({ id: id })
            .populate("usersJoined")
            .populate("comments")
            .populate("owner");

        res.status(200).json(chat);
    } catch (error) {
        next(error);
    }
};

const postChatComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content, chatId } = req.body;

        const user = await User.findById(id);
        const date = new Date();

        const comments = await Comment.find();
        const commentId = comments.length + 1;

        const newComment = new Comment({
            date: date,
            content: content,
            id: commentId,
            chatId: chatId,
            from: [],
        });
        await newComment.save();

        await Comment.findOneAndUpdate(
            { id: chatId },
            {
                $push: { from: user },
            }
        );
        const commentUpdated = await Comment.findOne({ id: chatId });

        res.status(200).json(commentUpdated);
    } catch (error) {
        next(error);
    }
};

export { getChatDetail, postChatComment };
