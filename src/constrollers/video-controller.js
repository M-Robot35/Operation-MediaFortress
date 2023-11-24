const VideoDownloads = require('../cores/youtube-download/downloadsfile copy')


class Video{
    
    constructor( url ){
        this.video = new VideoDownloads(url)
        
    }

    async get_status( qualidade ){
        const video = await this.video.informationVideo()
        const title = video.info.title
        const qualidades = video.qualidades
        const qualidade_video = qualidades.find(ql => ql.itag == qualidade)['qualityLabel']
        return {
            title, 
            qualidade_video
        }
    }
}

module.exports = Video