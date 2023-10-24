const dl = require('../cores/youtube-download/downloadsfile')
const VideoDownloads = require('../cores/youtube-download/downloadsfile copy')
const path = require('path')
const files_modify = require('../utils/files')
const response = require('../utils/responses')


const caminho_download = path.join(__dirname, '../', 'downloads')


module.exports = {
    
     downloads: async( req, res ) => {
        const { url, qualidade, name } = req.body
        
        const execute = new VideoDownloads( url )
        const nome = name  ? name : ( await execute.informationVideo() )['info']['title']
        if(!nome) return console.log('A Variavel [ nome ] está Vazia ')        
        
        // verifica de o arquivo existe, se existir ele deleta 
        files_modify.path_remove( `${path.join(caminho_download, nome)}.mp4`)
        
        const struture = {
            url,
            qualidade,
            arrayParams: [
                // Remove ffmpeg's console spamming
                '-loglevel', '8', '-hide_banner',
                // Redirect/Enable progress messages
                '-progress', 'pipe:3',
                // Set inputs
                '-i', 'pipe:4',
                '-i', 'pipe:5',
                // Map audio & video from streams 
                '-map', '0:a',
                '-map', '1:v',
                // Keep encoding
                '-c:v', 'copy',
                // Define output file
                `${ path.join(caminho_download, nome) }.mp4`,
              ]   
        }
        
        const download_video = dl(struture, res)
        //res.send('tudo ok [ Download ]')
        
        response.response_ok(res, 'tudo ok [ Download ]')
               
    },

    infoVideo: async (req, res ) => {
        const { url } = req.query
        if(!url) return response.response_fail(res, 'insira uma url')

        const execute = new VideoDownloads( url )
        const result = await execute.informationVideo()
        response.response_ok(res, result)
    }
}