import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  interest: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    default: "",
  },
});

const Users = mongoose.model("Users", userSchema);
export default Users;
