const Message = require("../models/MessageModel");
const Chat = require("../models/chatModel");


const createChat = async (req, res) => {
  try {
    const { currentUser, userId } = req.body;
    if (!userId && !currentUser) {
      console.log("UserId param not sent with request");
      return res.status(400).send("UserId param not sent with request");
    }

    const existingChat = await Chat.findOne({
      users: { $all: [currentUser, userId] }
    });

    if (existingChat) {
      return res.status(200).send(existingChat);
    } else {

      const chatData = {
        chatName: "sender",
        users: [currentUser, userId],
      };

      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      return res.status(200).send(FullChat);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const fetchChats = async (req, res) => {
  try {
    const { currentUser, userId } = req.body;
    let result = await Chat.find({
      users: { $all: [currentUser, userId] }
    }); 

    let message = await Message.find({
      sender: userId
    });


    res.status(200).json({result, message});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createChat,
  fetchChats,
};
