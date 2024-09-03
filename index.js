const http = require("node:http");
const express = require("express");

const PORT = process.env.PORT ?? 5000;

const app = express();

// button.addRequestListener('event', handler)
// app.method('/users', hadler)

// GET http://localhost:5000/
app.get("/", (request, response) => {
  response.status(200).send("Hello, world))))");
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is listening http://127.0.0.1:${PORT}`);
});
