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
  const divide = data.sock;
  const components = divide.split("@");
  const porcent = data.porcent.replace("%", "");
  const progress = document.querySelector(`#${components[1]}`);
  progress.value = porcent;

  const fullelement = progress.parentNode;
  fullelement.querySelector(
    "#bits-download"
  ).innerHTML = `${data.atual}/${data.total}`;
  fullelement.querySelector("#bits-porcent").innerHTML = `${data.porcent}`;
});

socket.on("done", (data) => {
  const divide = data.sock;
  const components = divide.split("@");
  const progress = document.querySelector(`#${components[1]}`);
  progress.value = 100;

  const fullelement = progress.parentNode;
  fullelement.querySelector("#bits-porcent").innerHTML = `100%`;
  fullelement.querySelector("#btn-dl").removeAttribute("disabled");
});
