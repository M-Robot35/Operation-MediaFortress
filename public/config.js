function production(){
    if(window.location.hostname == 'localhost'){
        console.log('HOST :  ',window.location.hostname)
        return 'http://localhost:3001'
    }
    console.log('HOST :  ',window.location.hostname)
    return 'https://deploy-youtube.onrender.com'
}

export default  {    
    urlServer : production(),// Não pode ter a "/" no final
}

