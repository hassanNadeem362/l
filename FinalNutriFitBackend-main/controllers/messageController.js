const Message = require("../models/MessageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const sendMessage = async (req, res) => {

  try {
    const { senderId, content, chatId } = req.body;
    
    const senderExists = await User.exists({ _id: senderId });
    if (!senderExists) {
      return res.status(404).json({ error: "Sender does not exist" });
    }
    const message = await Message.create({ sender: senderId, content, chat: chatId });

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const allMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { sendMessage, allMessages };
