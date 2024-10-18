const userModel = require('../models/userModel');
const UserModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

// const getUsers = async (req, res) => {
//     // const allusers = await userModel.find();
//     res.json(req.user)
// }

const getUser = async (req, res) => {
    const user = await userModel.findById(req.user.id, { password: 0 });
    // console.log(req.user.id);
    res.json(user);
    // res.json({message: `information of user with id ${req.params.id}`})
}

const userRegister = async (req, res) => {

    console.log(req.body);
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const foundUser = await userModel.findOne({ email: email });
    if (foundUser) {
        res.status(400).json({ message: "user already exists" })
    } else {
        const user = await UserModel.create({
            email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            phone: req.body.phone,
            gender: req.body.gender
        }



        )

        res.json(user.id)
    }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
      // Login successful, you can return user data or a message
      return res.status(200).json({
          message: "Login successful",
          user: {
              id: user._id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              age: user.age,
              phone: user.phone,
              gender: user.gender
          },
      });
  } else {
      return res.status(401).json({ message: "Wrong email or password" });
  }
};
  

module.exports = {
    // getUsers,
    getUser,
    userRegister,
    loginUser
}