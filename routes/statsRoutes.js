
const express = require('express');
const router = express.Router();
const { getSubscriberCount } = require('../controllers/statsController');

router.get('/subscribers', getSubscriberCount); 


module.exports = router; 