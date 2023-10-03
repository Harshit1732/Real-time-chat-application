const express = require("express");
const messageController= require('../controller/messagecontroller');
const  {protect} = require("../middleware/auth");

const router = express.Router();

router.post("/messages",protect, messageController.storeMessages);
router.get("/:sender/:receiver",protect, messageController.fetchMessages);

module.exports = router