const app = require("express")();
const uuid = require("uuid");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("connected", "hello world");
  socket.on("user-connected", (name) => {
    socket.broadcast.emit("s-user-connected", name);
    socket.emit("s-you-connected", uuid.v4());
  });
  socket.on("new-message", (message) => {
    socket.broadcast.emit("s-new-message", message);
    socket.emit("s-new-message", message);
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Running on port ${port}`));
