import mongoose from "mongoose";
import emailValidator from 'email-validator'

import crypto from 'crypto'
const db_link = 'mongodb+srv://admin:a7ZoRKpdk8bVwQaJ@cluster0.7riogrr.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log('user db connected');
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 6,
    validate: function () {
      return this.confirmPassword == this.password
    }
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'restaurantowner', 'deliveryboy'],
    default: 'user'
  },
  profileImage: {
    type: String,
    default: '../Images/UserIcon.png'
  },
  resetToken: String
});


userSchema.pre('save', function () {
  this.confirmPassword = undefined;
});

userSchema.methods.createResetToken = function () {
  //creating unique token using npm i crypto
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
}

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
}

export const userModel = mongoose.model('userModel', userSchema);