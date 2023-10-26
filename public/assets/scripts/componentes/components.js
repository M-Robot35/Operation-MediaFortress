export default new Vue({
  el: "#url-get",
  data: {
    message: "Insira uma URL do Youtube Ex: https://www.youtube.com/",
    url_player: "",
    dados_api: "",
  },

  methods: {
    cancelarDownload() {
      this.url_player = "";
      return (this.dados_api = null);
    },

    async axios(url) {
      const url_params = `http://localhost:3001/info?url=${url}`;
            
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
            this.url_player= ''  
        }
    }
})

      const dados = await fetch(url_params, {
        method: "get",
      });
      return await dados.json();
    },

    async buscarVideo() {
      if (!this.url_player && matchYoutubeUrl(this.url_player)) {
        return "Não é uma url do youtube";
      }

      function matchYoutubeUrl(url) {
        var p =
          /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/;
        return url.match(p) ? true : false;
      }
      const inf = await this.axios(this.url_player);
      this.dados_api = inf;
      console.log(this.dados_api);
    },
  },
});

//
