const helpers = require('../utils/utils')
const VideoDownloads = require('../cores/youtube-download/downloadsfile copy')
const responses = require('../utils/responses')

module.exports = {

    /**
     * verifica se os campos obrigatorios estão sendo passados corretamente
     * e se os campos não estão vazios
     */
    camposObrigatorios: (req, res, next) =>{   
        try {
            // garante que terá os campos url       
            const camposObrigatorios = helpers.camposObrigatorios(req.query, ['url']  )
            if(camposObrigatorios['error']) return responses.response_fail(res, camposObrigatorios.data)
                           
            next()            
        } catch (error) {
            if(!camposObrigatorios) return responses.response_fail(res, '', 500)            
        } 
    },
    
    /**
     * Verifica se é um Link valido do Youtube
     */
    linkYoutubeVerify: (req, res, next ) => {
        const { url, qualidade } = req.query 
        const [validateYoutube] = url.match(/^https:\/\/www.youtube.com/g);

        // verifica se e um video do youtube
        if(!validateYoutube) {
            return responses.response_fail(res, "Somente links do Yoube")
        }
        next()
    },

    /**
     * Verifica se é a itag passada pelo usuario existe
     */
    itagVerify: async(req, res, next ) => {
        const {url,  itag } = req.query 

        if( itag ){
            const execute = new VideoDownloads( url )
            const result = (await execute.informationVideo())['qualidades']
            const itags = result.find( it=>  it.itag == itag )
            if( !itags ) return responses.response_fail(res, "itag Not Found")        

        }
        next()
    }
    
}