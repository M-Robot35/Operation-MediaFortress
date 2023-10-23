
export default new Vue({
    el:'#url-get',
    data:{
        message:'Insira uma URL do Youtube Ex: https://www.youtube.com/',
        nome : 'Thiago Teles',
        url_player:''
    },
    
    methods:{
        say() {            
            return 'Estou na função Say'
        },
        
        buscarVideo(){    
            if( !(this.url_player.length > "https://www.youtube.com".length))   return console.log("falta palavras")    
            console.log('passou')
            return this.message = 'nada pra fazer kraio'
        }
    }
})

//

