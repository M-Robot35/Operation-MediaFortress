const executeDownload = require('../cores/youtube-download/downloadsfile')
const VideoDownloads = require('../cores/youtube-download/downloadsfile copy')
const path = require('path')
const files_modify = require('../utils/files')
const response = require('../utils/responses')

const caminho_download = path.join(__dirname, '../', 'downloads')

module.exports = {
    
     downloads: async( req, res ) => {
        const { url, qualidade, name, itag } = req.query 

        console.log(url, qualidade, name)
        const execute = new VideoDownloads( url )
        const nome = name  ? name : ( await execute.informationVideo() )['info']['title']
        if(!nome) return console.log('A Variavel [ nome ] está Vazia ')        
        
        // verifica se o arquivo existe, se existir ele deleta 
        files_modify.path_remove( `${path.join(caminho_download, nome)}.mp4`)
        
        const struture = {
            url,
            qualidade,
            arrayParams: [
                '-loglevel', '8', '-hide_banner',
                '-progress', 'pipe:3',
                '-i', 'pipe:4',
                '-i', 'pipe:5',
                '-map', '0:a',
                '-map', '1:v',
                '-c:v', 'copy',
                `${ path.join(caminho_download, nome) }.mp4`,
            ]   
        } 

        executeDownload(struture, res)        
        
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