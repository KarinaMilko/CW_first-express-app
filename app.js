const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json()); // json -> req.body

const users = [
  {
    id: uuidv4(),
    firstName: "Test",
    lastName: "Testovych",
    email: "mail@mail.com",
  },
  {
    id: "14a38120-a623-4cb1-a596-9aec98438b65",
    firstName: "Test2",
    lastName: "Testovych2",
    email: "mail2@mail.com",
  },
];

// CRUD
const createUser = (req, res) => {
  // дістати користувача, який прийшов
  const { body } = req;

  // додати йому uuid і зберігти в масив
  users.push({ ...body, id: uuidv4() });

  // відправити створеного користувача в якості відповіді + 201
  res.status(201).send(users[users.length - 1]);
};

const getUsers = (req, res) => {
  res.status(200).send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((u) => u.id === id);
  // якщо не існує, то 404
  if (!foundUser) {
    return res.status(404).send("User Not Found");
  }
  // якщо користувач існує, то відправити його
  res.status(200).send(foundUser);
};

const updateUserById = (req, res) => {
  // витягти id + body користувача
  const {
    body,
    params: { id },
  } = req;
  // знайти користувача
  const foundUserIndex = users.findIndex((u) => u.id === id);
  // якщо не існує, то  User Not Found 404
  if (foundUserIndex === -1) {
    return res.status(404).send("User Not Found");
  }
  // якщо існує - оновити і відправити
  users[foundUserIndex] = { ...users[foundUserIndex], ...body };
  res.status(200).send(users[foundUserIndex]);
};

const deleteUserById = (req, res) => {
  const { id } = req.params;

  const foundUserIndex = users.findIndex((u) => u.id === id);

  if (foundUserIndex === -1) {
    return res.status(404).send("User Not Found");
  }

  users.splice(foundUserIndex, 1);
  res.status(204).send();
};

// CRUD
app.post("/users", createUser);
app.get("/users", getUsers);
app.get("/users/:id", getUserById); // :id => req.params.id
app.patch("/users/:id", updateUserById);
app.delete("/users/:id", deleteUserById);

module.exports = app;
