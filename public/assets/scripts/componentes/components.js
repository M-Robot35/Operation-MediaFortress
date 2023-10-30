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

      const dados = await fetch(url_params, {
        method: "get",
      });
      return await dados.json();
    },

    async download() {
      const qualidade = document.getElementById("qualidade");
      const url_params = `http://localhost:3001/download?url=${this.url_player}&qualidade=${qualidade}`;

      const dados = await fetch(url_params, {
        method: "get",
      });
      return await dados.json();
    },

    async fazerDownload() {
      const qualidade = document.getElementById("qualidade").value;
      console.log(
        "🚀 ~ file: components.js:36 ~ fazerDownload ~ qualidade:",
        qualidade
      );
      const url = this.url_player;

      /* const dados = await fetch(
        `http://localhost:3001/download?url=${url}&qualidade=${qualidade}`,
        {
          method: "get",
          // Converte o objeto 'data' em JSON e o envia como corpo da solicitação
        }
      );

      const arquivo = await dados;

      const arquivoUrl = window.URL.createObjectURL(arquivo);
      const a = document.createElement("a");
      a.download = (await this.dados_api.info.title) + ".mp4";
      a.href = arquivoUrl;
      a.click(); */

      const a = document.createElement("a");
      a.href = `http://localhost:3001/download?url=${url}&qualidade=${qualidade}`;
      a.click();
      a.remove();
    },

    async buscarVideo() {
      function matchYoutubeUrl(url) {
        var p =
          /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/;
        return url.match(p) ? true : false;
      }
      if (!this.url_player && matchYoutubeUrl(this.url_player)) {
        return "Não é uma url do youtube";
      }
      const inf = await this.axios(this.url_player);

      this.dados_api = inf;
      console.log(this.dados_api.info.video_url);
    },
  },
});

//

document
  .getElementById("flexSwitchCheckChecked")
  .addEventListener("click", () => {
    if (document.body.classList.contains("dark_mode")) {
      document.body.classList.toggle("white_mode");
    }
  });
