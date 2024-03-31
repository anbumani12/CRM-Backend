import mongoose from "mongoose";

const validateEmail = (value) => {
  return String(value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      message: "Name is Required",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateEmail,
        message: (props) => `${props.value} is Invalid Email`,
      },
    },
    password: {
      type: String,
      required: true,
      message: "Password is required",
    },
    role: {
      type: String,
      default: "admin",
    },
    status: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
    collection: "users",
  }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
