
export default new Vue({
    el:'#url-get',
    data:{
        message:'Insira uma URL do Youtube Ex: https://www.youtube.com/',
        url_player:'',
        dados_api:'',
        iframe_video:''
    },
    
    methods:{
        variaveisUp(){
            // iframe
            //if(iframe_video) iframe_video = ''
            iframe_url = `https://www.youtube.com/embed/${this.dados_api.info.videoId}?si=WmzoBLM4by1uvVk8`
            this.iframe_video = `<iframe width="560" height="315" src="${ iframe_url }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
            console.log('variaveisUp : ', iframe_url)
        },

        cancelarDownload() {      
            this.url_player= ''      
            return this.dados_api = null
        },

        async axios(url){
            const url_params = `http://localhost:3001/info?url=${url}`
            
            const dados = await fetch(url_params,{
                method: 'get',
            })          
           return await dados.json()           
        },

        async stream( url ){
            await fetch( url )
        },
        
        async buscarVideo(){   
           if( !(this.url_player.startsWith('https://www.youtube.com'))) return 'Não é uma url do youtube'
            const inf = await this.axios(this.url_player)
            this.dados_api = inf.data   
            this.variaveisUp()
            this.url_player= ''              
        }
    }
})

//

