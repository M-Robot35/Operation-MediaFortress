const dl = require("../cores/youtube-download/downloadsfile");
const VideoDownloads = require("../cores/youtube-download/downloadsfile copy");
const path = require("path");
const files_modify = require("../utils/files");
let fs = require("fs");

module.exports = {
  downloads: async (req, res) => {
    const { url, qualidade, name } = req.query;

    const caminho_download = path.join(__dirname, "../", "downloads");

    const execute = new VideoDownloads(url);
    const nome = (await name)
      ? name.toString()
      : (await execute.informationVideo()).info.title;

    if (!nome) return console.log("A Variavel [ nome ] está Vazia ");

    const novoNome = nome.replace(/[\\/:*?"<>|]/g, "_");

    // verifica de o arquivo existe, se existir ele deleta
    files_modify.path_remove(`${path.join(caminho_download, novoNome)}.mp4`);
    const caminho = `${path.join(caminho_download, novoNome)}.mp4`.trim();

    const struture = {
      url,
      qualidade,
      arrayParams: [
        // Remove ffmpeg's console spamming
        "-loglevel",
        "8",
        "-hide_banner",
        // Redirect/Enable progress messages
        "-progress",
        "pipe:3",
        // Set inputs
        "-i",
        "pipe:4",
        "-i",
        "pipe:5",
        // Map audio & video from streams
        "-map",
        "0:a",
        "-map",
        "1:v",
        // Keep encoding
        "-c:v",
        "copy",
        "-c:a",
        "copy",
        // Define output file
        "-f",
        "matroska",
        "pipe:6",
      ],
    }; // olhar o formato de video que o  arquivo é convertido para autorizar adiantar em outros players fora do vlc
    const download_video = dl(struture, res, novoNome, req);

    //await download_video.pipe(res);

    //res.send( 'ok')
  },

  infoVideo: async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(404).send("insira uma url");

    const execute = new VideoDownloads(url);
    const x = await execute.informationVideo();
    res.send(x);
  },
};
