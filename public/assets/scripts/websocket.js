const socket = io();

export let idSocket;
socket.on("connect", (data) => {
  const { id } = socket;

  idSocket = id;
  console.log("🚀 ~ file: index.html:72 ~ socket.on ~ idSocket:", idSocket);

  const saveLocalStorage = localStorage.setItem(`${id}`, id);

  //  const saveLocalStorage = localStorage.setItem(`id`, id)
});

/* socket.on("hello", (data) => {
  const getLocalStorage = localStorage.getItem(`${idSocket}`);

  if (data.id === getLocalStorage) {
    const { downloaded, total } = data[`video${getLocalStorage}`];
    const status_dl = document.getElementById("bites-count");
    const progress = document.getElementById("bar-progress");
    status_dl.innerHTML = `${downloaded} / ${total}`;
    progress.style.width = data.porcent;
  }
});

socket.on("done", (data) => {
  const getLocalStorage = localStorage.getItem(`${idSocket}`);
  if (data.id === getLocalStorage) {
    const progress = document.getElementById("bar-progress");
    progress.innerHTML = "Download Completo";
    document.getElementById("write_download").style.display = "block";
    document.getElementById("loading").style.display = "none";
    document.getElementById("load_write").style.display = "none";
    document.getElementById("dl_active").removeAttribute("disabled");
  }
  console.log("io", data.id);
  //localStorage.clear(data.id)a;
}); */
