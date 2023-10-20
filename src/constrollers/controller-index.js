const dl = require('../cores/youtube-download/downloadsfile')
const VideoDownloads = require('../cores/youtube-download/downloadsfile copy')
const path = require('path')
const files_modify = require('../utils/files')


const caminho_download = path.join(__dirname, '../', 'downloads')

// audios disponiveis
// [ highestvideo,  ]
module.exports = {
    
     downloads: async( req, res ) => {
        const { url, qualidade, name } = req.body
        
        const execute = new VideoDownloads( url )
        const nome = name  ? name : ( await execute.informationVideo())['title']

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
        
        const download_video = dl(struture)
        res.send( 'ok')        
    },

    infoVideo: async (req, res ) => {
        const { url } = req.body
        const execute = new VideoDownloads( url )
        const x = await execute.informationVideo()
        res.send(x)
    }
}