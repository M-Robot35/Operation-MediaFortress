const { Server } = require("socket.io");
const ev = require("./events");

module.exports = function (http) {
  const io = new Server(http);
  // server-side
  io.on("connection", (socket) => {
    //  console.log(socket.id); // x8WIv7-mJelg7on_ALbx

    ev.on("bits", (event) => {
      io.emit("hello", event);
    });

    ev.on("done", (event) => {
      event.id = socket.id;
      io.emit("done", event);
    });
  });
};
