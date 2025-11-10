
const Subscriber = require('../models/Subscribe');
const logger = require('../config/logger');

exports.getSubscriberCount = async (req, res) => {
  try {
    const count = await Subscriber.countDocuments();
    logger.info(`Subscriber count requested:' ${count}`)

    res.status(200).json({
      success : true,
      totalSubscribers : count
    });

  } catch (err) {
    logger.error('Failed to get subscriber count', err);
    res.status(500).json({
      success : false,
      message : 'Server error'
    });
  }
}