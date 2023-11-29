const executeDownload = require('../cores/youtube-download/downloadsfile')
const VideoDownloads = require('../cores/youtube-download/downloadsfile copy')
const path = require('path')
const files_modify = require('../utils/files')
const response = require('../utils/responses')

const Video = require('./video-controller')
const Ffmpeg = require('./ffmpeg-controller')

const caminho_download = path.join(__dirname, '../', 'downloads')

module.exports = {
    
     downloads: async( req, res ) => {
        const { url, qualidade , socket} = req.query    

        const video = new Video( url )
        const ffmpeg = new Ffmpeg()
        
        const {title, qualidade_video} = await video.get_status( qualidade )           
        
        // retira charactes especiais para não dar problema ao salvar 
        function limpaCaracteresWindows( texto){
            return texto.replace(/[\\/:*?"<>|]/g, "_");        
        } 

        const nome = limpaCaracteresWindows(`${title}_Video-${qualidade_video}`)
        
        // verifica se o arquivo existe, se existir ele deleta 
        files_modify.path_remove( `${path.join(caminho_download, nome)}.mp4`)        
        
        const input_video = ffmpeg.ff_video(url, nome, qualidade)        
        executeDownload(input_video,socket, res)
    },

    infoVideo: async (req, res ) => {
        const { url } = req.query
        if(!url) return response.response_fail(res, 'insira uma url')
        
        const execute = new VideoDownloads( url )
        const result = await execute.informationVideo()
        
        response.response_ok(res, result)
    }
}