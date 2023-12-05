const socketAction = require("./ws-connect.");
const websoc = require("ws");


const eventoSock = require("./events");
var openSocket = new socketAction();
const wss = new websoc.Server({ port: 8082 });

wss.on("connection", (ws) => {
  //openSocket.add()

  ws.on("message", (data) => {
    const { id, sk } = JSON.parse(data);
    openSocket.add(id, ws);
    //openSocket.show()
  });
  
  eventoSock.on("bits", (event) => {
    const { sock } = event;
    
    console.log(JSON.parse(event))
    console.log(event)

    
    
    openSocket(sock).send(event);
  });


  console.log(eventoSock.eventNames())
});