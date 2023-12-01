

class socketAction{
    constructor(){
        this.clientsOnline = {}
    }

    show(){
        console.log('SOCKET SHOW : ',this.socket_id)
    }

    add(id, socket){
        this.clientsOnline[id]= socket
    }

    get(randomID){
        return this.clientsOnline[randomID]
    }

    remove(socketID){
        const allkeys = Object.keys(this.clientsOnline)
        const keyRemove = allkeys.find(key => this.clientsOnline[key] == socketID)
        delete this.clientsOnline[keyRemove]
    }

    alterar(){
        this.clientsOnline[id]= socket
    }
}

module.exports = socketAction