# PASTAS 
    CORES  = programas centrais para o funcionamento do o aplicativo  [ Exemplo youtube-dl-exec     ] 
    
    ULTILS = methodos que podem ser ultilados em várias partes do código
    
    SERVICES = para ultilizar programas externos [ Exemplo  API externas, outros ]

# EXEMPLOS API ytdl:
    // Example of choosing a video format.
        let info = await ytdl.getInfo(videoID);
        let format = ytdl.chooseFormat(info.formats, { quality: '134' });
        console.log('Format found!', format);

    // Example of filtering the formats to audio only.
        let info = await ytdl.getInfo(videoID);
        let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        console.log('Formats with only audio: ' + audioFormats.length);


# PRINCIPAIS DADOS DO VIDEO :
    NOME DO VIDEO
    NOME DO CANAL
    THUMBNAILS
    ID DO VIDEO
    URL DO VIDEO
    AUTOR
    VIEWS


#https://ffmpegwasm.netlify.app/docs/getting-started/usage
https://ffmpeg.org/ffmpeg-all.html

# ROTAS
    POST "/download" 
    
        body {
            "url": [ url youtube ]
            "qualidade": [ qualidade do video ],
            "name" : [ nome do video - opcional ] 
        }

        qualidades disponiveis:

            [ highestvideo, lowestvideo, quality, highest, lowest, highestaudio, lowestaudio ]

    GET "/info"
        parametros na URL 
            exemplo : /info?url=[ url youtube ]



