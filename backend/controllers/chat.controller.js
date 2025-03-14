const Chat = require('../models/chat.model');
const Item = require('../models/item.model');
const User = require('../models/user.model');

// Create a new chat or get existing one
exports.createOrGetChat = async (req, res) => {
  try {
    const { itemId } = req.body;
    const inquirerId = req.user._id;
    
    // Find the item
    const item = await Item.findById(itemId);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    const ownerId = item.owner;
    
    // Check if user is not the owner
    if (inquirerId.toString() === ownerId.toString()) {
      return res.status(400).json({ message: 'You cannot chat about your own item' });
    }
    
    // Check if chat already exists
    let chat = await Chat.findOne({
      item: itemId,
      owner: ownerId,
      inquirer: inquirerId
    });
    
    // If chat doesn't exist, create a new one
    if (!chat) {
      chat = new Chat({
        item: itemId,
        owner: ownerId,
        inquirer: inquirerId,
        messages: [],
        lastMessage: new Date()
      });
      
      await chat.save();
    }
    
    // Return the chat with populated references
    const populatedChat = await Chat.findById(chat._id)
      .populate('item', 'title images price status')
      .populate('owner', 'username avatar')
      .populate('inquirer', 'username avatar');
    
    res.status(201).json(populatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all chats for a user
exports.getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find all chats where user is either owner or inquirer
    const chats = await Chat.find({
      $or: [
        { owner: userId },
        { inquirer: userId }
      ],
      isActive: true
    })
      .sort({ lastMessage: -1 })
      .populate('item', 'title images price status')
      .populate('owner', 'username avatar')
      .populate('inquirer', 'username avatar');
    
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single chat by id
exports.getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    // Find the chat
    const chat = await Chat.findById(id)
      .populate('item', 'title description images price status')
      .populate('owner', 'username avatar')
      .populate('inquirer', 'username avatar');
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    // Check if user is a participant
    if (chat.owner.toString() !== userId.toString() && chat.inquirer.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to view this chat' });
    }
    
    // Mark all messages as read for this user
    if (chat.owner.toString() === userId.toString()) {
      chat.messages.forEach(message => {
        if (message.sender.toString() !== userId.toString()) {
          message.isRead = true;
        }
      });
    } else {
      chat.messages.forEach(message => {
        if (message.sender.toString() !== userId.toString()) {
          message.isRead = true;
        }
      });
    }
    
    await chat.save();
    
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a message to a chat
exports.addMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, attachments } = req.body;
    const userId = req.user._id;
    
    // Find the chat
    const chat = await Chat.findById(id);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    // Check if user is a participant
    if (chat.owner.toString() !== userId.toString() && chat.inquirer.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to send messages in this chat' });
    }
    
    // Check if chat is active
    if (!chat.isActive) {
      return res.status(400).json({ message: 'This chat is no longer active' });
    }
    
    // Create message
    const newMessage = {
      sender: userId,
      content,
      attachments: attachments || []
    };
    
    // Add message to chat
    chat.messages.push(newMessage);
    chat.lastMessage = new Date();
    
    await chat.save();
    
    // Populate the message sender
    const populatedChat = await Chat.findById(id)
      .populate('messages.sender', 'username avatar');
    
    const addedMessage = populatedChat.messages[populatedChat.messages.length - 1];
    
    res.status(201).json(addedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update chat status
exports.updateChatStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, finalPrice } = req.body;
    const userId = req.user._id;
    
    // Find the chat
    const chat = await Chat.findById(id);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    // Check if user is a participant
    if (chat.owner.toString() !== userId.toString() && chat.inquirer.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this chat' });
    }
    
    // Update status
    chat.status = status;
    
    // If status is 'agreed', update final price
    if (status === 'agreed' && finalPrice) {
      chat.finalPrice = finalPrice;
    }
    
    await chat.save();
    
    // If status is 'completed', update item status
    if (status === 'completed') {
      await Item.findByIdAndUpdate(chat.item, { status: 'sold' });
    }
    
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};