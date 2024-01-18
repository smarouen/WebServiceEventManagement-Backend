const mongoose = require('mongoose') //ODM pour connecter a mongoDB
const User = require('../models/user') //model of user (name , email , password etc)
const bcrypt = require('bcrypt') // to hash password 
const jwt = require('jsonwebtoken') // generate a unique token to every new user when logged in (verify logged in user to provide authorization to apply CRUD operations)
const express = require('express') // framework backend javaScript
require('dotenv').config(); // environement varibale file where i store the sensitive data such as url connection to my database that contains name of db and its password(i used this so that i can hide this data when i push my work on github)


  ///////////////////////////////////////    Sign Up Logic   /////////////////////////////////////////////////
exports.userSignup = async (req, res) => {
  try {
    const UserExist = await User.find({ email: req.body.email }).exec()
    if (UserExist.length > 0) {
      return res.status(400).json({
        error: true,
        message: "mail already exist"
      })
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      const savedUser = await user.save()
      res.status(200).json({
        success: true,
        message: 'user signed up successfully',
        user: savedUser
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: true,
      message: "ERROR WE WILL FIX THIS DONT WORRY"
    })
  }
}
  ///////////////////////////////////////    Login  Logic  /////////////////////////////////////////////////

exports.userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid Email or Password."
      });
    } else {

      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        return res.status(400).json({
          error: true,
          message: "Invalid Email or Password."
        });
      }

      let token = jwt.sign({ _id: user._id, email: user.email, }, process.env.JWT_SECRET, {
        expiresIn
          : '6h'
      });
      res.cookie('token', token, { httpOnly: true }).status(200).json({
        success: true,
        token,
        userId: user._id
      });
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      error: true,
      message: "ERROR WE WILL FIX THIS DONT WORRY"
    })
  }
}
