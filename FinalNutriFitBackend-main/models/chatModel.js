// chatName
// isGroupChat
// users
// latestMessage
// groupAdmin

const mongoose = require("mongoose");

const chatModel = new mongoose.Schema(
  {
    chatName: {type: String},
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nutrafit",
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports  = Chat