function production(){
    if(window.location.hostname == 'localhost'){
        return 'http://localhost:3005'
    }
    return 'https://deploy-youtube.onrender.com'
}

export default  {    
    urlServer : production(),// Não pode ter a "/" no final,
    channelWebsocket : ''
}

