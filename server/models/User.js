const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

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
  uuid: {
    type: String,
    unique: true,
    lowercase: true,
  },
  jwt: {
    type: String,
  },
});

// hash password hook
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// generate UUID hook
userSchema.pre("save", async function (next) {
  this.uuid = uuidv4();
  next();
});

// userSchema.post("save", async function () {

// });

userSchema.plugin(AutoIncrement, { inc_field: "user_id" });

const User = mongoose.model("user", userSchema);

module.exports = User;
