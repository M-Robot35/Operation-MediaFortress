const { Server } = require("socket.io");
const ev = require("./events");
const socketAction = require("./ws-connect.");

var openSocket = new socketAction();

module.exports = function (http) {
  const io = new Server(http);

  // server-side
  io.on("connection", (socket) => {

    // recebendo informação do client
    socket.on("socketID", (event) => {
      const { randomID, socketID } = event;
      openSocket.add(randomID, socketID);
      //openSocket.show();
    });

    // remove usuario apos desconnnectar
    socket.on("disconnect", (reason) => {
      openSocket.remove(socket.id);
    });

    // envia os dados do download para o usuario
    ev.on("bits", (event) => {
      const { sock } = event;
      [sockID, videoID] = sock.split("@");
      io.to(openSocket.get(sockID)).emit("hello", event);
    });

    // avisa o front quando o download terminou
    ev.on("done", (event) => {
      const { sock, msg } = event;
      [sockID, videoID] = sock.split("@");
      io.to(openSocket.get(sockID)).emit("done", event);
    });
  });
}; 
