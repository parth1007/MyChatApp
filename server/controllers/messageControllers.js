const asyncHandler =  require('express-async-handler');
const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require("../models/Chat");

// Send a message
// /api/message/
// Auth Token given
// Req.body => message content and chatId


const sendMessage = asyncHandler(async (req,res) => {
    const {content,chatId} = req.body;

    if(!content || !chatId) {
        console.log("Invalid data passed to sendMessage");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender:req.user._id,
        content:content,
        chat:chatId
    };

    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender","name email profilePic");
        message = await message.populate("chat");
        message = await User.populate(message,{
            path: 'chat.users',
            select: "name email profilePic"
        });

        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        })
        res.json(message)

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})


// Fetch all messages of a given chat
// /api/message/:chatId
// Auth Token given
// Req.param => chatId
// Req.body => null

const allMessage = asyncHandler(async (req,res) => {
    try {
        const messages = await Message.find({chat: req.params.chatId})
                        .populate("sender","name email profilePic")
                        .populate("chat");

        res.json(messages);

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = {sendMessage,allMessage};