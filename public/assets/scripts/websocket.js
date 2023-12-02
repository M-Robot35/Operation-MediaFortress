let idClient;

if (!idClient) {
  idClient = Math.random().toString(36).substr(2, 9);
}
//console.log('ID SOCKET :', idClient)
const socket = io();

//enviando o id random e o socket para o server
socket.on("connect", (data) => {
  const { id } = socket;
  socket.emit("socketID", { randomID: idClient, socketID: id });
});

socket.on("hello", (data) => {
  const status_dl = document.getElementById("bites-count");
  const progress = document.getElementById("bar-progress");
  status_dl.innerHTML = `${data.atual} / ${data.total}`;
  progress.style.width = data.porcent;
});

socket.on("done", (data) => {
  const progress = document.getElementById("bar-progress");
  progress.innerHTML = "Download Completo";
  document.getElementById("write_download").style.display = "block";
  document.getElementById("loading").style.display = "none";
  document.getElementById("load_write").style.display = "none";
  document.getElementById("dl_active").removeAttribute("disabled");
});
