import UserModel from "../models/UserModel.js";
import Auth from "../common/Auth.js";

const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find({ role: "admin" }, { password: 0 });
    res.status(200).send({
      message: "Data Fetch Successful",
      users,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const create = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    let user = await UserModel.findOne({ email: email });

    if (!user) {
      password = await Auth.hashPassword(password);
      await UserModel.create({ name: `${firstName} ${lastName}`, email, password }); 

      res.status(200).send({
        message: "User Created Successfully",
      });
    } else {
      res.status(400).send({
        message: `User with ${email} already exists`,
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;
    let user = await UserModel.findById(userId);
    if (user) {
      await UserModel.deleteOne({ _id: userId });
      res.status(200).send({
        message: "User Deleted Successfully",
      });
    } else {
      res.status(400).send({
        message: "Invalid User",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    //validate if the email and password are valid
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email: email });

    if (user) {
      if (await Auth.hashCompare(password, user.password)) {
        let token = await Auth.createToken({
          email,
          role: user.role,
          id: user._id,
        });

        res.status(200).send({
          message: "Login Successful",
          role: user.role,
          token,
          name: user.name,
        });
      } else {
        res.status(400).send({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).send({
        message: "User Does Not Exists",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};
export default {
  create,
  getAllUsers,
  deleteUser,
  login,
};
