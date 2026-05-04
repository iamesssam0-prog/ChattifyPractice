const Message = require("../models/Message");
const User = require("../models/User");
const { getReceiverSocketId } = require("../lib/socket");

const cloudinary = require('cloudinary').v2;

const { io } = require('../lib/socket');

//get All Contacts function

const getAllContacts = async (req, res) => {
    try {
        const userId = req.user._id;
        const contacts = await User.find({ _id: { $ne: userId } }).select("-password");
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.log(error);
    }
}



//function to get messages between two users

const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: id },
                { receiverId: myId, senderId: id }
            ]
        })

        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: "No Messages between both of you or no conversation at all" })
        }
        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.log(error);
    }
}


//function to send messages

// const sendMessage = async (req, res) => {
//     try {

//         const { text } = req.body;
//         const senderId = req.user._id;
//         const { id: receiverId } = req.params;

//         const image = req.file;


//         if (!text && !image) {
//             return res.status(404).json({ message: "Text or Image are required" });
//         }

//         if (senderId.equals(receiverId)) {
//             return res.status(400).json({ message: "connot send message to yourself" });
//         }

//         const receiverExists = await User.exists({ _id: receiverId });
//         if (!receiverExists) {
//             return res.status(404).json({ message: "Receiver not found" });
//         }


//         //missing upload images to cloudinary

//         let imageUrl = "";
//         if (image) {

//             const imageUpload = await cloudinary.uploader.upload(image.path, {
//                 resource_type:
//                     "image"
//             })

//             imageUrl = imageUpload.secure_url;
//         }

//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             text,
//             image: imageUrl
//         })

//         await newMessage.save();
//         res.status(200).json(newMessage);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//         console.log(error);
//     }
// }

const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const senderId = req.user._id;
        const { id: receiverId } = req.params;
        const image = req.file;

        if (!text && !image) {
            return res.status(400).json({ message: "Text or Image are required" });
        }

        if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send message to yourself" });
        }

        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found" });
        }

        // الجزء المتعدل هنا
        let imageUrl = "";
        if (image) {
            const imageUpload = await cloudinary.uploader.upload(image.path, {
                resource_type: "image"
            });
            imageUrl = imageUpload.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text: text || "", // لو مفيش text هينزل string فاضي مش undefined
            image: imageUrl   // لو مفيش صورة هينزل string فاضي زي ما عرفناها فوق
        });

        await newMessage.save();

        //send message in real-time if user is online - socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            //الايفينت بتاع ال emit بيبعت لكل المتصل ان في رساله اتبعتت ولكن دلوقتي مع ال to حددنا واحد بس 
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.log(error);
    }
}



// function to get chat partners
const getChatPartners = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        //find messages where the logged in user is a sender or receiver 
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUser }, { receiverId: loggedInUser }
            ]
        });

        const userIds = [
            ...new Set(
                messages.map((msg) => (
                    msg.senderId.toString() === loggedInUser.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                ))
            )
        ]

        const chatPartners = await User.find({ _id: { $in: userIds } }).select("-password");
        res.status(201).json(chatPartners);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.log(error);
    }
}




//delete message

const deleteMessage = async (req, res) => {
    try {
        const { messageId, selectedUser } = req.body;
        if (!messageId) return res.status(404).json({ message: "Message not found" });

        //check if the user is the sender of the message so we delete it
        const myId = req.user._id

        let deletedMessage = await Message.findOneAndDelete({
            _id: messageId,
            senderId: myId
        });

        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found or unauthorized" });
        }

        const receiverSocketId = getReceiverSocketId(selectedUser);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("messageDeleted", messageId);
        }

        res.status(200).json({ message: "Message deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        console.log(error);
    }
}






module.exports = {
    getAllContacts, getMessagesByUserId,
    sendMessage, getChatPartners, deleteMessage
};