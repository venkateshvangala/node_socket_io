const express = require("express");
const mysql = require("mysql2");
const app = express();
const router = express.Router();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
const { getCurrentUser, userDisconnect, joinUser } = require("./users");

app.use(express());
const port = 8000;

app.use(cors());

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "chat_app",
});

var server = app.listen(port, () => {
  connection.connect((err) => {
    if (err) {
      console.log("failed to connect database");
    }
    console.log("connection established successfully");
  });
  console.log(`Server is running on the port no: ${port} `.green);
});



app.get('/chat_history', function (req, res) {
  connection.query("SELECT * FROM chat_history", (error, messages) => {
    console.log(messages);
    res.send(messages);
  });
});


const io = socket(server);

//initializing the socket io connection
io.on("connection", (socket) => {
  //for a new user joining the room
  socket.on("joinRoom", ({ username, roomname }) => {
    //* create user
    const user = joinUser(socket.id, username, "venkat");
    console.log(socket.id, "=id");
    socket.join(user.room);

    //display a welcome message to the user who have joined a room
    socket.emit("message", {
      userId: user.id,
      username: user.username,
      text: `Welcome ${user.username}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(user.room).emit("message", {
      userId: user.id,
      username: user.username,
      text: `${user.username} has joined the chat`,
    });
  });

  //user sending message
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const user = getCurrentUser(socket.id);
    let query = `INSERT INTO chat_history (userId, userName, messages) VALUES ("${user.id}", "${user.username}","${text}")`;
    console.log(query);
    connection.query(query);
    io.to(user.room).emit("message", {
      userId: user.id,
      username: user.username,
      text: text,
    });
  });

  //when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a left room message displayed
    const user = userDisconnect(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        userId: user.id,
        username: user.username,
        text: `${user.username} has left the room`,
      });
    }
  });
});
