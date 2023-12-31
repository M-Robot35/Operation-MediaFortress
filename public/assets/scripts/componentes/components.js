import server from "../../../config.js";
import RenderVideos from "./RenderVideos.js";

export default new Vue({
  el: "#url-get",
  data: {
    message: "Insira uma URL do Youtube Ex: https://www.youtube.com/",
    url_player: "", // vindo do usuario
    dados_api: "",
    iframe_video: "",
    last_url: null,
  },

  methods: {
    async variaveisUp(data) {
      this.last_url = data.title;

      // iframe
      const iframe_url = `https://www.youtube.com/embed/${data.videoId}?si=WmzoBLM4by1uvVk8`;
      this.iframe_video = `<iframe width="560" height="315" src="${iframe_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    },

    cancelarDownload() {
      this.url_player = "";
      return (this.dados_api = null);
    },

    async axios(url) {
      const url_params = `${server.urlServer}/info?url=${url}`;

      const dados = await fetch(url_params, {
        method: "get",
      });
      return await dados.json();
    },

    async buscarVideo() {
      if (!this.url_player.startsWith("https://www.youtube.com"))
        return "Não é uma url do youtube";
      const inf = await this.axios(this.url_player);
      this.dados_api = inf.data;

      RenderVideos.execute("videos-list", inf.data);

      this.variaveisUp(inf.data);
      this.last_url = this.url_player;
      this.url_player = "";
    },

    loading_download(status = false) {
      if (status) {
        document.getElementById("dl_active").setAttribute("disabled", "");
        document.getElementById("write_download").style.display = "none";
        document.getElementById("loading").style.display = "block";
        document.getElementById("load_write").style.display = "block";
        return;
      }
    },

    async fazerDownload() {
      console.log('ATIVANDO WORKER')
      const workerDownload = new Worker('./websocket.js')
      
      workerDownload.postMessage('tudo certo por aqui')     
    },
  },

  computed: {}, 
  components: {},

  template: `
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
    
</section>      `,
});
