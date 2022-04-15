const express = require("express");
const userRouter = express.Router();

const { updateUser, deleteUser, getUser } = require("../controllers/users");

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
