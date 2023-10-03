const express= require('express');

const router= express.Router();
const chatcontroller= require('../controller/chatcontroller');
const protect= require('../middleware/auth');

router.post('/', protect.protect, chatcontroller.accessChat);
router.get('/',protect.protect, chatcontroller.fetchChats);
router.post('/group', protect.protect, chatcontroller.createGroupChat);
router.put("/rename",protect.protect, chatcontroller.renameGroup);
router.put("/groupremove",protect.protect, chatcontroller.removeFromGroup);
router.put("/groupadd",protect.protect, chatcontroller.addToGroup);


module.exports= router;