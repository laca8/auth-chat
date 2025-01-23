const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const globalError = require("./middleware/errorHandler");
const ApiError = require("./utils/ApiError");
const db = require("./config/db");
const authRoute = require("./routes/auth");
const http = require("http");
const Server = require("socket.io").Server;
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
dotenv.config();
db();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

let chatRoom = "";
let allUsers = []; // All users in current chat room
let chatRoomUsers = [];
io.on("connection", (socket) => {
  console.log(`${socket.id} join...`);
  socket.on("join_room", (data) => {
    const { username, roomId } = data; // Data sent from client when join_room event emitted
    // console.log(username, roomId);

    socket.join(roomId); // Join the user to a socket room
    // Add this
    // let __createdtime__ = Date.now(); // Current timestamp
    // socket.to(roomId).emit("receive_message", {
    //   message: `${username} has joined the chat room`,
    //   username: username,
    //   __createdtime__,
    // });
    // Add this
    // Save the new user to the room
    chatRoom = roomId;
    allUsers.push({ id: socket.id, username, roomId });
    chatRoomUsers = allUsers.filter((user) => user.roomId === roomId);
    socket.to(roomId).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });
  socket.on("send_message", (data) => {
    // console.log(data);
    const { message, username, roomId, __createdtime__ } = data;
    io.in(roomId).emit("receive_message", data); // Send to all users in room, including sender
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    // Remove the user from the room
    allUsers = allUsers.filter((user) => user.id !== socket.id);
    chatRoomUsers = allUsers.filter((user) => user.roomId === chatRoom);
    socket.to(chatRoom).emit("chatroom_users", chatRoomUsers);
  });
});
const port = process.env.PORT || 5000;

//routes
app.use("/api/auth", authRoute);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}
app.use("*", (req, res, next) => {
  next(new ApiError("this route not found", 404));
});
app.use(globalError);

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
