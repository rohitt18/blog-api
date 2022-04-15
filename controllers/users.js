const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

// Update User
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      // to update our password also
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(401).json("You can update only your account.");
  }
};

// Delete User

// const deleteUser = async (req, res) => {
//   if (req.body.userId === req.params.id) {
//     try {
//       await User.findByIdAndDelete(req.params.id);
//       return res.status(200).json("User has been deleted...");
//       // this setup is good but there's a problem here
//       // i.e, even if we delete this user, we can still see this user's post
//       // so we have to delete all the posts of this user
//       // so firstly, we have to find this user and then delete all the posts of this user

//     } catch (error) {
//       return res.status(500).json(error);
//     }
//   } else {
//     return res.status(401).json("You can delete only your account.");
//   }
// };

const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      // first check if the user exists or not
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username }); // jiska username: voh user ka username hoga voh sab del kar dena
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been deleted...");
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      return res.status(404).json("User not found");
    }
  } else {
    return res.status(401).json("You can delete only your account.");
  }
};

// Get User
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
};
