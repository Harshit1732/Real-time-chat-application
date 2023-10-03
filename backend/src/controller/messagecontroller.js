const messages = require("../models/messagemodel");

const storeMessages = async (req, res) => {
  const { sender, receiver, content } = req.body;
  try {
    const message = await messages.create({
      sender,
      receiver,
      content,
      timestamp: new Date(),
    });
    await message.save();
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send the message" });
  }
};


const fetchMessages= async(req,res)=>{
  const { sender, receiver } = req.params;
  try {
   
    const message = await messages.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 }); // Sort by timestamp ascending
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}

module.exports={storeMessages, fetchMessages}