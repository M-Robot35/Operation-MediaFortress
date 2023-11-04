
export default new Vue({
    el:'#url-get',
    data:{
        message:'Insira uma URL do Youtube Ex: https://www.youtube.com/',
        url_player:'', // vindo do usuario
        dados_api:'',
        iframe_video:'',
        last_url : null
    },
    
    methods:{
        async variaveisUp( data ){
            this.last_url = data.title
            // iframe
            const iframe_url = `https://www.youtube.com/embed/${data.videoId}?si=WmzoBLM4by1uvVk8`
            this.iframe_video = `<iframe width="560" height="315" src="${ iframe_url }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
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
                
        async buscarVideo(){   
           if( !(this.url_player.startsWith('https://www.youtube.com'))) return 'Não é uma url do youtube'
            const inf = await this.axios(this.url_player)
            this.dados_api = inf.data   
            this.variaveisUp( inf.data)
            this.last_url = this.url_player
            this.url_player= '' 
        },

        async fazerDownload(){
            const qualidade = document.getElementById('qualidade')
            const itag = qualidade.value                    
            const link_get = `http://localhost:3001/download?url=${this.last_url}&qualidade=${itag}`            
           
            const a = document.createElement("a"); 
            a.href = link_get;
            a.click();
            a.remove();
            
        }
    }
})

//

