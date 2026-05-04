const express = require('express');

const { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners
    , deleteMessage
} =
    require("../controllers/messageController");
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');


const router = express.Router();

router.get("/contacts", protect, getAllContacts);
router.get("/chats", protect, getChatPartners);
router.post("/send/:id", protect, upload.single("image"), sendMessage);
router.get("/:id", protect, getMessagesByUserId);
router.delete("/deleteMessage", protect, deleteMessage);
module.exports = router;


