const mongoose = require('mongoose');


const chatModel = mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true,
        },
        isGroupChat:{
            type: Boolean,
            default: false,
        },
        users: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        ],
        latestMessege:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Messege",
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    },
    {timestamps:true}
);


module.exports = mongoose.model('Chat', chatModel);
