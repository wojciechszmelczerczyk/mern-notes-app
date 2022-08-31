import { Schema, Model, model } from "mongoose";
import { compare, hash, genSalt } from "bcrypt";

import validator from "validator";

interface IUser {
  email: string;
  password: string;
  refreshToken: string;
}

interface UserModel extends Model<IUser> {
  login(email: string, password: string): Object;
}

const userSchema = new Schema<IUser, UserModel>({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
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
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

// login user
userSchema.static("login", async function (email, password) {
  // find user with passed email
  const user = await this.findOne({
    email,
  });
  // if exists compare passed password with one from the database
  if (user) {
    const auth = await compare(password, user.password);
    // if passwords match return user, otherwise throw an error
    if (auth) {
      return user;
    }
    throw Error("Password is too short");
  }
  throw Error("Please enter a valid email");
});

const User = model<IUser, UserModel>("user", userSchema);

export default User;
