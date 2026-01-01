const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const User = require("../model/user.model");

async function handleUserLogin(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: 'Email or password missing' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ message: 'User does not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return response.status(401).json({ message: 'Password is incorrect' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '1d' }
    );

    response
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: 'User logged in successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    response.status(500).json({ message: 'Server error', error: error.message });
  }
}


async function handleUserRegistration(request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: 'Name, email, or password missing',
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return response.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    
    await newUser.save();

    response.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    response.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function handleGetCurrentUser(request, response) {
  if (!request.user) {
    return response.status(401).json({ message: 'Unauthorized' });
  }
  response.status(200).json({ user: request.user });
}



async function handleUserLogout(request, response) {
  return response
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    .json({ message: 'Logged out successfully' });
}



module.exports = {
    handleUserRegistration,
    handleUserLogin,
    handleGetCurrentUser,
    handleUserLogout
};