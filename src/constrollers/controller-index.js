const executeDownload = require('../cores/youtube-download/downloadsfile')
const VideoDownloads = require('../cores/youtube-download/downloadsfile copy')
const path = require('path')
const files_modify = require('../utils/files')
const response = require('../utils/responses')

const caminho_download = path.join(__dirname, '../', 'downloads')

module.exports = {
    
     downloads: async( req, res ) => {
        const { url, qualidade } = req.query        

        const execute = new VideoDownloads( url )
        const videoInfo = ( await execute.informationVideo() )
        
        const title = videoInfo.info.title
        const quali = videoInfo.qualidades
        const setQualidade = quali.find(ql => ql.itag == qualidade)['qualityLabel']
        
        // retira charactes especiais para não dar problema ao salvar 
        function limpaCaracteresWindows( texto){
            return texto.replace(/[\\/:*?"<>|]/g, "_");        
        } 

        const nome = limpaCaracteresWindows(`${title}_Video-${setQualidade}`)
        console.log(nome)       
        
        // verifica se o arquivo existe, se existir ele deleta 
        files_modify.path_remove( `${path.join(caminho_download, nome)}.mp4`)        

        const struture = {
            url,
            qualidade,
            nome,
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
        "pipe:3",
        "-i",
        "pipe:4",
        // Map audio & video from streams
        "-map",
        "0:a",
        "-map",
        "1:v",
        // Keep encoding
        "-c:v",
        "copy",
        // Define output container
        "-f",
        "matroska",
        "pipe:5",
            ]   
        } 

        executeDownload(struture,  res)       
        
    },

    infoVideo: async (req, res ) => {
        const { url } = req.query
        if(!url) return response.response_fail(res, 'insira uma url')
        
        const execute = new VideoDownloads( url )
        const result = await execute.informationVideo()
        
        response.response_ok(res, result)
    }
}