const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const path = require('path')
require('dotenv').config();



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
      // send mail to user so he can get verfied
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
