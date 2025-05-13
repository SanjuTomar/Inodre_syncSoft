const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists (optional, if you want to handle duplicate email early)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ error: 'Email is already registered.' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    // Send user data and token in response
    res.status(201).send({ 
      message: 'Registration successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
        // Do NOT send password or sensitive fields
      },
      token
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Customize error messages for common issues
    let errorMessage = 'Registration failed. Please try again.';
    if (error.code === 11000) {
      // Mongo duplicate key error code
      errorMessage = 'Email already exists. Please login or use another email.';
    }

    res.status(400).send({ error: errorMessage });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid login credentials');
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { register, login };