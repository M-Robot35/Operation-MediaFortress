

let idClient;

if (!idClient) {
  idClient = Math.random().toString(36).substr(2, 9);
}
const socket = io();

//enviando o id random e o socket para o server
socket.on("connect", (data) => {
  const { id } = socket;
  socket.emit("socketID", { randomID: idClient, socketID: id });
});

socket.on("hello", (data) => {
  const divide = data.sock
  const components  = divide.split('@')
  const porcent = data.porcent.replace('%', '')  
  const progress = document.querySelector(`#${components[1]}`);
  progress.value= porcent;
});

socket.on("done", (data) => {
  const divide = data.sock
  const components  = divide.split('@')
  const progress = document.querySelector(`#${components[1]}`);
  progress.value= 100;
});
