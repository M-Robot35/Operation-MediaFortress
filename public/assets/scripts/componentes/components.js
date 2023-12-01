import server from '../../../config.js';
import RenderVideos from './RenderVideos.js';

//console.log("SERVER : "+ server.urlServer)

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
            const url_params = `${server.urlServer}/info?url=${url}`
            
            const dados = await fetch(url_params,{
                method: 'get',
            })          
           return await dados.json()      
        },
                
        async buscarVideo(){   
            if( !(this.url_player.startsWith('https://www.youtube.com'))) return 'Não é uma url do youtube'
            const inf = await this.axios(this.url_player)
            this.dados_api = inf.data  
            
            //implementando
            RenderVideos.execute(inf.data)

            this.variaveisUp( inf.data)
            this.last_url = this.url_player
            this.url_player= '' 
        },

        loading_download(status=false){
            if(status){
                
                 document.getElementById("dl_active").setAttribute('disabled', '')
                 document.getElementById("write_download").style.display='none'
                document.getElementById("loading").style.display = 'block'
                document.getElementById("load_write").style.display='block'
                return
            }
        },
        
        async fazerDownload(){
           
            this.loading_download(true)
            const qualidade = document.getElementById('qualidade') 
            const itag = qualidade.value   
            const socket = idClient

            const link_get = `${server.urlServer}/download?url=${this.last_url}&qualidade=${itag}&socket=${socket}`            
           
            const a = document.createElement("a"); 
            a.href = link_get;
            a.download = this.last_url+'.mp4'
            a.click();
            a.remove();                        
        }
    },
    
    computed:{

    },
    components: {
        
        
    },

    template:`
    <section   class="border p-2 rounded mb-5" id="url-get">        
    <div  class="mb-3">
        <input type="text" class="form-control" id="urlvideo" placeholder="URL video" v-model="url_player" required>
                    
        <div id="passwordHelpBlock" class="form-text">
            {{ message }}
        </div>
    
        <div>
            <button v-on:click="buscarVideo()" type="button" class="btn btn-primary w-100 mt-2">Buscar Video</button>
        </div>   
    </div>    
    
</section>      `
})


//
{/* <section   class="border p-2 rounded mb-5" id="url-get">        
    <div  class="mb-3">
        <input type="text" class="form-control" id="urlvideo" placeholder="URL video" v-model="url_player" required>
                    
        <div id="passwordHelpBlock" class="form-text">
            {{ message }}
        </div>
    
        <div>
            <button v-on:click="buscarVideo()" type="button" class="btn btn-primary w-100 mt-2">Buscar Video</button>
        </div>   
    </div>    

    <div v-if="dados_api" class="">
        <div >
            <img v-bind:src="dados_api.info.thumbnail.url " class="img-fluid" alt="imagem">                    
            <h2>
                <div v-if="dados_api" id="title">
                    {{ dados_api.info.title }}                     
                </div>
            </h2>
            
            <div id="passwordHelpBlock" class="form-text mb-2">
                <span>Canal : </span>{{ dados_api.info.ownerChannelName }}  
            </div>                
        </div>

        <div class="border d-flex justify-content-between align-items-center">
            
            <div class="d-flex">
                <span class="fw-bold text-center p-2 rounded">QUALIDADE : </span>
                
                <div class="">
                    <select class="form-select" aria-label="Default select example" id="qualidade">                            
                        <option v-for="(item, index) in dados_api.qualidades" :value="item.itag" >
                            {{ item.qualityLabel }}
                        </option>    
                    </select>
                </div>
            </div>
            
            <div class="d-flex gap-1">
                <button v-on:click=" cancelarDownload()" class="btn-primary  text-center p-2 rounded" >Cancel</button>
                <button id="dl_active" v-on:click="fazerDownload() "  class="btn-primary text-center p-2 rounded">
                    <span id="write_download">Download</span>
                    <div class="d-flex text-center align-items-center gap-2">
                        <span id="loading" style="display: none;" class="spinner-border spinner-border-sm " aria-hidden="true"></span>
                        <span id="load_write" style="display: none;" role="status">Loading...</span>
                    </div>
                </button>                        
               
            </div>

        </div>     

        <!-- progresbar -->
        <div class="container mt-3 d-flex justify-content-between w-100">
            <div id="bar-progress" class="progress-bar progress-bar-striped bg-success " role="progressbar" style="width: 80%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            <div id="bites-count" class="w-25">-- / --</div>
        </div>  
    </div>
</section>   */}




 
