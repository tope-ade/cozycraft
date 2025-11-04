
const Subscriber = require('../models/Subscribe');

//handle new subsription
exports.subscribe = async (req,res) => {
  try {
    const {email} = req.body
    if (!email) {
      return res.status(400).json({message: 'Email is required.'});
    }

    //if subscribed
    const existing = await Subscriber.findOne({email});
    if (existing) {
      return res.status(400).json({message: 'This email is already subscribed'});
    }

    //save new
    const newSubscriber = new Subscriber({email});
    await newSubscriber.save();
    res.status(201).json({message: 'Subscription successful'});

  } catch (err) {
    console.error('Error subscribing', err);
    res.status(500).json({message: 'Server error. Please try again later'});
  }
}