const path = require("path");
const fs = require("fs");
const { EventEmitter } = require("events");
const ytdl = require("ytdl-core");

class Youtube {
  // url do video
  url;

  // instancia da lib de downloads
  youtube;

  // constroy uma opção de configurações padrão para o aplicativo
  #optionsDefault = {};

  // diretorio padrão caso o usuario não tenha definido o caminho para salvar o download
  pathDefault = path.join(__dirname, "../", "../", "downloads");

  eventYoutube = new EventEmitter();

  constructor(url) {
    this.url = url;
    this.youtube = ytdl;
    this.checkRequiriments();
  }

  /**
   * Configura eventos personalizados dentro do programa
   * também existe esse função de eventos na instancia
   * do youtube
   *
   * @param {object} newOptons
   */
  eventos() {
    this.eventYoutube.on("download", (event) => {
      console.log("[  Download concluido  ]  \n\t" + event);
    });
  }

  /**
   * cria opções padrão caso o usuario não passe    *
   */
  opcoesDefault() {
    // construir uma opção padrão
    this.optionsDefault = {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    };
  }

  /**
   * cria ou modifica as opções  de um video
   *
   * @param {object} newOptons
   */
  setOptions(newOptons) {
    if (typeof newOptons !== "object" || Array.isArray(newOptons))
      throw Error("Options deve ser um Objeto");

    Object.keys(newOptons).forEach((opKey) => {
      this.optionsDefault[opKey] = newOptons[opKey];
    });
  }

  /**
   * Garante que todos os requirimentos do App
   * estão iniciados e bem configurados para um
   * bom funcionamento do programa   *
   */
  async checkRequiriments() {
    // garante que haja uma URL
    if (!this.url) throw TypeError("Necessario enviar uma URL DO YOUTUBE");

    // Cria pasta Downloads caso não ouver :
    const folder = fs.existsSync(this.pathDefault);
    if (!folder) {
      await fs.mkdir(this.pathDefault, { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("Directory created successfully!");
      });
    }

    this.eventos();
    this.opcoesDefault();
  }

  async informationVideo() {
    const info = await this.youtube.getBasicInfo(this.url, this.optionsDefault);
    const lista_videos = info.related_videos || null;

    let filtro = [];

    info.formats.forEach((format) => {
      if (format.qualityLabel) {
        const informacoes = {
          mimetype: format.mimeType,
          itag: format.itag,
          qualityLabel: format.qualityLabel,
          qualidade: format.quality,
          fps: format.fps,
        };
        if (!filtro.find((fill) => fill.qualidade == informacoes.qualidade)) {
          filtro.push(informacoes);
        }
      }
    });

    const {
      title,
      videoId,
      video_url,
      description,
      author,
      ownerProfileUrl,
      ownerChannelName,
      thumbnail,
      likes,
    } = info.videoDetails;

    const envVideoInfo = {
      info: {
        title,
        videoId,
        video_url,
        description,
        author,
        ownerProfileUrl,
        ownerChannelName,
        thumbnail: thumbnail.thumbnails.at(-1),
        likes,
        playList: lista_videos,
      },
      qualidades: filtro.sort((a, b) => a.qualityLabel - b.qualityLabel),
    };

    return envVideoInfo;
  }
}

module.exports = Youtube;
