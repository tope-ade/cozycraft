

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res) => {
  try {
    const {name, email, password} = req.body;
    if (!name, !email, !password)
      return res.status(400).json({
      message : 'please provide name, email, password to continue'
    });

    const existing = await User.findOne({email});
    if (existing)
      return res.status(400).json({
      message : 'Email already in use'
    }); 

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({name, email, password: hashed});
    await user.save();

    const token =jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.status(201).json({
      token, user: {id: user._id, name: user.name, email: user.email}
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message : 'server error'
    });
  }
};

exports.login = async (req,res) => {
  try {
    const {email, password} = req.body;
    if (!email, !password)
      return res.status(400).json({
      message : 'please provide email, password to continue'
    });

    const user = await User.findOne({email});
    if (!user)
      return res.status(400).json({
      message : 'Invalid credentials'
    });

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
    return res.status(400).json({
    message : 'Invalid credentials'
    });

    const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: '7d'});
    
    res.json({token, user: {id: user._id, name: user.name, email: user.email}});

  } catch (err) {
    console.error(err);
    res.status.json({
      message : 'server error'
    });
  }
};