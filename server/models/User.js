const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password is too short. Minimum length is 6 characters"],
  },

  refreshToken: {
    type: String,
  },
});

// hash password hook
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// login user
userSchema.statics.login = async function (email, password) {
  // find user with passed email
  const user = await this.findOne({
    email,
  });
  // if exists compare passed password with one from the database
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    // if passwords match return user, otherwise throw an error
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
