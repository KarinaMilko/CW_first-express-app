const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("./controllers/usersController");

const app = express();
app.use(express.json()); // json -> req.body

// CRUD
app.post("/users", createUser);
app.get("/users", getUsers);
app.get("/users/:id", getUserById); // :id => req.params.id
app.patch("/users/:id", updateUserById);
app.delete("/users/:id", deleteUserById);

module.exports = app;
