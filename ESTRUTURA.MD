# DOCUMENTAÇÕES
    VUE
        https://br.vuejs.org/v2/guide/conditional#v-else-if
        https://br.vuejs.org/v2/guide/list
    
    BOOTSTRAP
        https://getbootstrap.com/docs/5.3/utilities/text/
        

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
    GET "/download" 
    
        * Query Params: 
            "url": [ url youtube ] - obrigatorio
            "qualidade": [ qualidade do video ] - opcional,
            "name" : [ nome do video ] - opcional - opcional
            "itag" : [ itag do video do youtube ] - opcional
        
        * Exemplo: 
            http://localhost:3001/download?url=https://www.youtube.com/watch?v=tMZIwRwWd6Q

        * qualidades disponiveis:

            [ highestvideo, lowestvideo, quality, highest, lowest, highestaudio, lowestaudio ]

    GET "/info"
        
        * parametros na URL 
            exemplo : /info?url=[ url youtube ]



obrigatorio ter uma url
obrigatorio  ter uma qualidade
validar se e um video do youtube