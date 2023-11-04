
export default defaultsocket = io();

socket.emit('bity-video', 'teste para bite video')
socket.on('bity-video', ( data )=>[
    console.log(data)
])